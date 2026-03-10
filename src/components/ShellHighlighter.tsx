import React from "react";
import {
  isKeyword,
  isOption,
  isPath,
  isNumber,
  matchOperator,
  isPrefixCommand,
} from "@/lib/shell-tokens";

type TokenType =
  | "command"   // any command (builtin or external) - green
  | "keyword"
  | "option"
  | "string"
  | "variable"
  | "comment"
  | "operator"
  | "number"
  | "path"
  | "text"
  | "prompt";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let expectCommand = true; // First word on line is command position

  while (i < line.length) {
    const remaining = line.slice(i);

    // Whitespace
    if (/^\s/.test(remaining)) {
      let end = 0;
      while (end < remaining.length && /\s/.test(remaining[end])) {
        end++;
      }
      tokens.push({ type: "text", value: remaining.slice(0, end) });
      i += end;
      continue;
    }

    // Comment - rest of line
    if (remaining[0] === "#") {
      tokens.push({ type: "comment", value: remaining });
      break;
    }

    // Single-quoted string (no interpolation)
    if (remaining[0] === "'") {
      let end = 1;
      while (end < remaining.length && remaining[end] !== "'") {
        end++;
      }
      if (end < remaining.length) end++; // include closing quote
      tokens.push({ type: "string", value: remaining.slice(0, end) });
      i += end;
      expectCommand = false;
      continue;
    }

    // Double-quoted string (with variable highlighting inside)
    if (remaining[0] === '"') {
      const stringTokens = tokenizeDoubleQuotedString(remaining);
      tokens.push(...stringTokens.tokens);
      i += stringTokens.consumed;
      expectCommand = false;
      continue;
    }

    // Variable: $VAR, ${VAR}, $(cmd), $((expr)), $?, $#, etc.
    if (remaining[0] === "$") {
      const varResult = parseVariable(remaining);
      tokens.push({ type: "variable", value: varResult.value });
      i += varResult.consumed;
      expectCommand = false;
      continue;
    }

    // Operator check (must be before word parsing)
    const op = matchOperator(remaining);
    if (op) {
      tokens.push({ type: "operator", value: op });
      i += op.length;
      // After certain operators, next word is in command position
      if (["|", "&&", "||", ";", "&", "(", "{"].includes(op)) {
        expectCommand = true;
      }
      continue;
    }

    // Word (command, builtin, keyword, option, path, number, or plain text)
    const wordMatch = remaining.match(/^[^\s'"$#|&;<>(){}[\]]+/);
    if (wordMatch) {
      const word = wordMatch[0];
      let type: TokenType = "text";

      if (expectCommand) {
        // First word position - check if keyword or command
        if (isKeyword(word)) {
          type = "keyword";
        } else if (isPrefixCommand(word)) {
          // Prefix commands (sudo, env, etc.) - not highlighted, next word is still command
          type = "text";
          // Stay in command position for the actual command
        } else {
          // All commands (builtins and external) are green
          type = "command";
          expectCommand = false;
        }
        // Keywords that expect more commands after them
        if (["if", "then", "else", "elif", "do", "while", "until", "for", "case", "in", "{", "("].includes(word)) {
          expectCommand = true;
        }
      } else {
        // Argument position
        if (isOption(word)) {
          type = "option";
        } else if (isPath(word)) {
          type = "path";
        } else if (isNumber(word)) {
          type = "number";
        } else if (isKeyword(word)) {
          // Keywords can appear mid-line too (then, do, done, fi, etc.)
          type = "keyword";
          expectCommand = true;
        }
      }

      tokens.push({ type, value: word });
      i += word.length;
      continue;
    }

    // Fallback: single character
    tokens.push({ type: "text", value: remaining[0] });
    i++;
  }

  return tokens;
}

function parseVariable(str: string): { value: string; consumed: number } {
  if (str.length < 2) {
    return { value: "$", consumed: 1 };
  }

  // ${...}
  if (str[1] === "{") {
    let depth = 1;
    let end = 2;
    while (end < str.length && depth > 0) {
      if (str[end] === "{") depth++;
      if (str[end] === "}") depth--;
      end++;
    }
    return { value: str.slice(0, end), consumed: end };
  }

  // $((...)) arithmetic
  if (str[1] === "(" && str[2] === "(") {
    let depth = 2;
    let end = 3;
    while (end < str.length && depth > 0) {
      if (str[end] === "(" && str[end - 1] === "(") depth++;
      if (str[end] === ")" && end + 1 < str.length && str[end + 1] === ")") {
        depth--;
        if (depth === 0) {
          end += 2;
          break;
        }
      }
      end++;
    }
    return { value: str.slice(0, end), consumed: end };
  }

  // $(...)
  if (str[1] === "(") {
    let depth = 1;
    let end = 2;
    while (end < str.length && depth > 0) {
      if (str[end] === "(") depth++;
      if (str[end] === ")") depth--;
      end++;
    }
    return { value: str.slice(0, end), consumed: end };
  }

  // $VAR or special vars like $?, $#, $@, $*, $$, $!, $0-$9, $_
  let end = 1;
  if (/[?#@*$!_0-9]/.test(str[1])) {
    end = 2;
  } else {
    while (end < str.length && /[a-zA-Z0-9_]/.test(str[end])) {
      end++;
    }
  }

  return { value: str.slice(0, end), consumed: end };
}

function tokenizeDoubleQuotedString(str: string): { tokens: Token[]; consumed: number } {
  const tokens: Token[] = [];
  let current = '"';
  let i = 1;

  while (i < str.length && str[i] !== '"') {
    // Escape sequence
    if (str[i] === "\\" && i + 1 < str.length) {
      current += str.slice(i, i + 2);
      i += 2;
      continue;
    }

    // Variable inside string
    if (str[i] === "$") {
      // Push accumulated string content
      if (current.length > 0) {
        tokens.push({ type: "string", value: current });
        current = "";
      }
      const varResult = parseVariable(str.slice(i));
      tokens.push({ type: "variable", value: varResult.value });
      i += varResult.consumed;
      continue;
    }

    current += str[i];
    i++;
  }

  // Closing quote
  if (i < str.length && str[i] === '"') {
    current += '"';
    i++;
  }

  if (current.length > 0) {
    tokens.push({ type: "string", value: current });
  }

  return { tokens, consumed: i };
}

function tokenize(code: string): Token[][] {
  const lines = code.split("\n");
  return lines.map((line) => {
    const trimmed = line.trimStart();
    const leadingWs = line.slice(0, line.length - trimmed.length);

    const tokens: Token[] = [];

    // Add leading whitespace
    if (leadingWs) {
      tokens.push({ type: "text", value: leadingWs });
    }

    // Handle prompt prefix
    if (trimmed.startsWith("$ ")) {
      tokens.push({ type: "prompt", value: "$ " });
      tokens.push(...tokenizeLine(trimmed.slice(2)));
    } else {
      tokens.push(...tokenizeLine(trimmed));
    }

    return tokens;
  });
}

const classMap: Record<TokenType, string> = {
  command: "sh-command",
  keyword: "sh-keyword",
  option: "sh-option",
  string: "sh-string",
  variable: "sh-variable",
  comment: "sh-comment",
  operator: "sh-operator",
  number: "sh-number",
  path: "sh-path",
  text: "",
  prompt: "sh-prompt",
};

interface ShellHighlighterProps {
  code: string;
  className?: string;
}

export default function ShellHighlighter({ code, className = "" }: ShellHighlighterProps) {
  const tokenizedLines = tokenize(code);

  return (
    <code className={className}>
      {tokenizedLines.map((tokens, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {tokens.map((token, tokenIndex) => {
            const cls = classMap[token.type];
            return cls ? (
              <span key={tokenIndex} className={cls}>
                {token.value}
              </span>
            ) : (
              <React.Fragment key={tokenIndex}>{token.value}</React.Fragment>
            );
          })}
          {lineIndex < tokenizedLines.length - 1 && "\n"}
        </React.Fragment>
      ))}
    </code>
  );
}
