# Change Log

### 1.5.0 - 2019-mm-dd
- Add `SHEETS` option to `ENV` command and `.env` file to define the spreadsheet
URL and tab names for each type of metric.
- Reorganize and expand `ENV` command test scripts.

### 1.4.2 - 2019-07-03
- Add `--prefix` option to add an identifier to the front of output file names

### 1.4.1 - 2019-07-02
- Add Audit command to support Discord guild metrics
- Add option to `heartbeat.sh` to allow modification of user name, voyage name, and password

### 1.4.0 - 2019-06-18
- Add GitHub extract file metrics to end of extract process.
- Add `--ghuserexclude` option to the `env` subcommand to specify user
names to be skipped when extracting GitHub metrics

### 1.3.1 - 2019-06-05
- Fix a bug that prevented all teams from being selected for GitHub extraction
[Issue #49](https://github.com/jdmedlock/chuseok-cli/issues/49)

### 1.3.0 - 2019-06-01
- Add `--categoryinclude` option to the `env` subcommand to specify the Discord
categories whose channels will be considered for metrics extraction.

### 1.2.0 - 2019-05-23
- Add `--dsuserexclude` option to the `env` subcommand to specify user
names to be skipped when extracting Discord metrics
- Update README.md to clarify which options apply to different extraction
sources such as Discord and GitHub

### 1.1.1 - 2019-04-22
- Add `list` subcommand to display `.env` variables and values
- Add `--suffix` option to `extract` subcommand to append suffixes to output
file names.

### 1.1.0 - 2019-04-21

- Add support for GitHub metrics extraction
- Add `--source` option to `extract` command to specify which set of metrics is
to be extracted - `discord` or `github`.
- Add `--githuborg` option to the `env` subcommand to specify which GitHub
Organization owns the repos metrics are to be extracted from.
- Add `--teaminclude` option to the `env` subcommand to specify a regular 
expression for matching repo team names.

### 1.0.0 - 2019-04-09

- Initial MVP release
- Includes support for extracting Discord metrics
