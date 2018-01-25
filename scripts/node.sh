#!/usr/bin/env bash

# Get the current node version
echo node version:
node -v
# Get the current npm version
echo npm version:
npm -v

if [[ "$OSTYPE" == "linux"* ]]; then
    # Linux
    echo OS: Linux

    # Update to the latest stable version
    curl -s -o $HOME/.nvm/nvm.sh https://raw.githubusercontent.com/creationix/nvm/v0.31.0/nvm.sh
    source $HOME/.nvm/nvm.sh
    nvm install stable

elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    echo OS: Mac

    # Update to the latest stable version
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
fi

# Get the updated node version
echo node version:
node -v
# Get the updated npm version
echo npm version:
npm -v