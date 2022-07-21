### Hexlet tests and linter status:
[![Actions Status](https://github.com/EuRV/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/EuRV/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/ab5f7f368da1c73b7c22/maintainability)](https://codeclimate.com/github/EuRV/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ab5f7f368da1c73b7c22/test_coverage)](https://codeclimate.com/github/EuRV/frontend-project-lvl2/test_coverage)

# Description: 
**Generator of difference** is the CLI programm that generate difference between two files. Supporting formats: JSON, YML, YAML.

## How to install:
1. Make sure you have installed [Node.js](https://nodejs.org/en/) no lower version 12: ```node -v```.
2. Clone repository: ```https://github.com/EuRV/frontend-project-lvl2.git```.
3. Change directory to frontend-project-lvl2
4. Run the command: ```make install```.

```shell
$ git clone https://github.com/EuRV/frontend-project-lvl2.git
$ cd frontend-project-lvl2
$ make install
```

## Run tests:
```shell
$ make test
```

## How to use:
You can use the project as a script in the terminal or as a library in your JavaScript project. You can format the difference in three styles: stylish (default), plain and json.
```shell
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -v, --version        output the version number
  -f, --format <type>  output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help           display help for command
```