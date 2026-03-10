import React from "react";

type TokenType = "comment" | "string" | "variable" | "command" | "text";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeLine(line: string, isFirstWord: boolean): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let foundCommand = !isFirstWord;

  while (i < line.length) {
    const char = line[i];

    // Comment - rest of line
    if (char === "#") {
      tokens.push({ type: "comment", value: line.slice(i) });
      break;
    }

    // Single-quoted string
    if (char === "'") {
      const end = line.indexOf("'", i + 1);
      if (end !== -1) {
        tokens.push({ type: "string", value: line.slice(i, end + 1) });
        i = end + 1;
        continue;
      }
    }

    // Double-quoted string (may contain variables)
    if (char === '"') {
      let j = i + 1;
      let str = '"';
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\" && j + 1 < line.length) {
          str += line.slice(j, j + 2);
          j += 2;
        } else {
          str += line[j];
          j++;
        }
      }
      if (j < line.length) {
        str += '"';
        j++;
      }
      // For simplicity, treat entire double-quoted string as string type
      // Could be enhanced to parse variables inside
      tokens.push({ type: "string", value: str });
      i = j;
      continue;
    }

    // Variable: $VAR, ${VAR}, $(cmd), $((expr))
    if (char === "$") {
      let varEnd = i + 1;

      if (line[varEnd] === "{") {
        // ${...}
        let braceCount = 1;
        varEnd++;
        while (varEnd < line.length && braceCount > 0) {
          if (line[varEnd] === "{") braceCount++;
          if (line[varEnd] === "}") braceCount--;
          varEnd++;
        }
      } else if (line[varEnd] === "(") {
        // $(...) or $((...))
        let parenCount = 1;
        varEnd++;
        while (varEnd < line.length && parenCount > 0) {
          if (line[varEnd] === "(") parenCount++;
          if (line[varEnd] === ")") parenCount--;
          varEnd++;
        }
      } else {
        // $VAR or $1, $?, etc.
        while (varEnd < line.length && /[a-zA-Z0-9_?!#$@*-]/.test(line[varEnd])) {
          varEnd++;
        }
      }

      if (varEnd > i + 1) {
        tokens.push({ type: "variable", value: line.slice(i, varEnd) });
        i = varEnd;
        continue;
      }
    }

    // Whitespace
    if (/\s/.test(char)) {
      let wsEnd = i;
      while (wsEnd < line.length && /\s/.test(line[wsEnd])) {
        wsEnd++;
      }
      tokens.push({ type: "text", value: line.slice(i, wsEnd) });
      i = wsEnd;
      continue;
    }

    // Word (command or regular text)
    let wordEnd = i;
    while (
      wordEnd < line.length &&
      !/[\s$'"#]/.test(line[wordEnd])
    ) {
      wordEnd++;
    }

    if (wordEnd > i) {
      const word = line.slice(i, wordEnd);
      if (!foundCommand && word.length > 0) {
        tokens.push({ type: "command", value: word });
        foundCommand = true;
      } else {
        tokens.push({ type: "text", value: word });
      }
      i = wordEnd;
      continue;
    }

    // Fallback: single character
    tokens.push({ type: "text", value: char });
    i++;
  }

  return tokens;
}

function tokenize(code: string): Token[][] {
  const lines = code.split("\n");
  return lines.map((line) => {
    // Check if line starts with prompt
    const trimmed = line.trimStart();
    const leadingWs = line.slice(0, line.length - trimmed.length);

    // Lines starting with # are full comments
    if (trimmed.startsWith("#")) {
      return [{ type: "comment" as TokenType, value: line }];
    }

    // Lines with prompt $ - command follows
    if (trimmed.startsWith("$ ")) {
      const tokens: Token[] = [];
      if (leadingWs) {
        tokens.push({ type: "text", value: leadingWs });
      }
      tokens.push({ type: "text", value: "$ " });
      tokens.push(...tokenizeLine(trimmed.slice(2), true));
      return tokens;
    }

    // Regular line - first word is command
    return tokenizeLine(line, true);
  });
}

const classMap: Record<TokenType, string> = {
  comment: "sh-comment",
  string: "sh-string",
  variable: "sh-variable",
  command: "sh-command",
  text: "",
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

// Export a simple function for use in non-React contexts
export function highlightShellToHTML(code: string): string {
  const tokenizedLines = tokenize(code);
  return tokenizedLines
    .map((tokens) =>
      tokens
        .map((token) => {
          const cls = classMap[token.type];
          if (cls) {
            return `<span class="${cls}">${escapeHtml(token.value)}</span>`;
          }
          return escapeHtml(token.value);
        })
        .join("")
    )
    .join("\n");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
