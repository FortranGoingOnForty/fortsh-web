#!/bin/bash
#
# fortsh installer
# Usage: curl -fsSL https://fortsh.musicsian.com/install.sh | bash
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Track download (fire and forget)
curl -sS -X POST "https://fortsh.musicsian.com/api/stats" >/dev/null 2>&1 || true

# Detect OS and distribution
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ -f /etc/os-release ]]; then
        . /etc/os-release
        case "$ID" in
            fedora|rhel|centos|rocky|alma)
                echo "rpm"
                ;;
            arch|manjaro|endeavouros|cachy)
                echo "arch"
                ;;
            debian|ubuntu|linuxmint|pop)
                echo "deb"
                ;;
            *)
                echo "unknown"
                ;;
        esac
    else
        echo "unknown"
    fi
}

# Check for required commands
check_command() {
    command -v "$1" >/dev/null 2>&1
}

# Install on Fedora/RHEL
install_rpm() {
    info "Detected Fedora/RHEL-based system"

    if ! check_command dnf; then
        error "dnf not found. This installer requires dnf."
    fi

    info "Adding musicsian repository..."
    sudo dnf config-manager --add-repo https://repos.musicsian.com/musicsian.repo

    info "Installing fortsh..."
    sudo dnf install -y fortsh

    info "fortsh installed successfully!"
}

# Install on Arch Linux
install_arch() {
    info "Detected Arch-based system"

    if check_command yay; then
        info "Installing fortsh from AUR using yay..."
        yay -S --noconfirm fortsh
    elif check_command paru; then
        info "Installing fortsh from AUR using paru..."
        paru -S --noconfirm fortsh
    else
        warn "No AUR helper found (yay/paru)."
        info "Install manually with:"
        echo ""
        echo "  git clone https://aur.archlinux.org/fortsh.git"
        echo "  cd fortsh && makepkg -si"
        echo ""
        exit 0
    fi

    info "fortsh installed successfully!"
}

# Install on macOS
install_macos() {
    info "Detected macOS"

    if check_command brew; then
        info "Installing fortsh via Homebrew..."
        brew install FortranGoingOnForty/tap/fortsh
        info "fortsh installed successfully!"
    else
        warn "Homebrew not found."
        info "Install Homebrew first: https://brew.sh"
        info "Then run: brew install FortranGoingOnForty/tap/fortsh"
        echo ""
        info "Alternatively, build from source:"
        echo ""
        echo "  # Install flang-new (for Apple Silicon) or gfortran (Intel)"
        echo "  git clone https://github.com/fortrangoingonforty/fortsh.git"
        echo "  cd fortsh && make && sudo make install"
        echo ""
        exit 0
    fi
}

# Install on Debian/Ubuntu (source build)
install_deb() {
    info "Detected Debian/Ubuntu-based system"
    warn "No pre-built packages available for Debian/Ubuntu yet."
    info "Building from source..."

    # Check for gfortran
    if ! check_command gfortran; then
        info "Installing gfortran..."
        sudo apt-get update
        sudo apt-get install -y gfortran make git
    fi

    build_from_source
}

# Build from source
build_from_source() {
    info "Building fortsh from source..."

    if ! check_command gfortran; then
        error "gfortran not found. Please install gfortran first."
    fi

    if ! check_command make; then
        error "make not found. Please install make first."
    fi

    if ! check_command git; then
        error "git not found. Please install git first."
    fi

    local tmpdir
    tmpdir=$(mktemp -d)
    cd "$tmpdir"

    info "Cloning fortsh repository..."
    git clone --depth 1 https://github.com/fortrangoingonforty/fortsh.git
    cd fortsh

    info "Compiling..."
    make

    info "Installing to /usr/local/bin..."
    sudo make install

    cd /
    rm -rf "$tmpdir"

    info "fortsh installed successfully!"
}

# Main installation logic
main() {
    echo ""
    echo "  ╔═══════════════════════════════════════╗"
    echo "  ║         fortsh installer              ║"
    echo "  ║   The Fortran Shell - POSIX + fish    ║"
    echo "  ╚═══════════════════════════════════════╝"
    echo ""

    local os
    os=$(detect_os)

    case "$os" in
        rpm)
            install_rpm
            ;;
        arch)
            install_arch
            ;;
        macos)
            install_macos
            ;;
        deb)
            install_deb
            ;;
        *)
            warn "Unknown operating system."
            info "Attempting to build from source..."
            build_from_source
            ;;
    esac

    echo ""
    info "To get started, run: fortsh"
    info "Documentation: https://fortsh.musicsian.com/docs"
    echo ""
}

main "$@"
