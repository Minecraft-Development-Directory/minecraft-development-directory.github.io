#!/bin/bash

# nixos fix
# see https://github.com/microsoft/vscode-remote-release/issues/11024
git config --global gpg.program "/usr/bin/gpg"
pnpm config set -g store-dir "${HOME}/.local/share/pnpm/store"
