/**
 * Shell token databases for fortsh-accurate syntax highlighting
 * Derived from fortsh source: builtins.f90 and ast_types.f90
 */

// All 60+ fortsh builtins (from builtins.f90 is_builtin_impl)
export const BUILTINS = new Set([
  "exit",
  "cd",
  "pwd",
  "pushd",
  "popd",
  "dirs",
  "prevd",
  "nextd",
  "dirh",
  "export",
  "echo",
  "jobs",
  "fg",
  "bg",
  "source",
  ".",
  ":",
  "history",
  "kill",
  "wait",
  "trap",
  "config",
  "alias",
  "unalias",
  "abbr",
  "help",
  "perf",
  "memory",
  "rawtest",
  "defun",
  "test",
  "[",
  "[[",
  "set",
  "shopt",
  "type",
  "which",
  "command",
  "unset",
  "readonly",
  "declare",
  "printenv",
  "local",
  "shift",
  "break",
  "continue",
  "return",
  "exec",
  "eval",
  "hash",
  "umask",
  "ulimit",
  "times",
  "let",
  "getopts",
  "printf",
  "read",
  "fc",
  "coproc",
  "complete",
  "compgen",
  "true",
  "false",
]);

// Shell keywords (from ast_types.f90 is_keyword)
export const KEYWORDS = new Set([
  "if",
  "then",
  "else",
  "elif",
  "fi",
  "for",
  "in",
  "do",
  "done",
  "while",
  "until",
  "case",
  "esac",
  "function",
  "select",
  "time",
]);

// Operators that get special highlighting
export const OPERATORS = [
  "&&",
  "||",
  "|&",
  "|",
  ";;",
  ";;&",
  ";&",
  ";",
  "&>>",
  "&>",
  ">>",
  ">|",
  ">",
  "<<-",
  "<<<",
  "<<",
  "<>",
  "<&",
  "<",
  ">&",
  "&",
  "((",
  "))",
  "(",
  ")",
  "{",
  "}",
  "[[",
  "]]",
  "!",
];

// Check if a word is a builtin
export function isBuiltin(word: string): boolean {
  return BUILTINS.has(word);
}

// Check if a word is a keyword
export function isKeyword(word: string): boolean {
  return KEYWORDS.has(word);
}

// Check if a string starts with an operator
export function matchOperator(str: string): string | null {
  for (const op of OPERATORS) {
    if (str.startsWith(op)) {
      return op;
    }
  }
  return null;
}

// Check if a word looks like an option/flag
export function isOption(word: string): boolean {
  return /^--?[a-zA-Z]/.test(word);
}

// Check if a word looks like a path
export function isPath(word: string): boolean {
  return word.includes("/") && !word.startsWith("$");
}

// Check if a word is a number
export function isNumber(word: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(word);
}
