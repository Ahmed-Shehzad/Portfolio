# Local Workflow Testing with Act

This directory contains tools for testing GitHub Actions workflows locally using [act](https://github.com/nektos/act).

## Prerequisites

1. **Install act**:

   ```bash
   # macOS
   brew install act

   # Or using curl
   curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
   ```

2. **Install Docker**:
   - Docker Desktop (recommended)
   - Ensure Docker is running before executing workflows

## Quick Start

1. **Run the default CI pipeline**:

   ```bash
   ./run-workflows-local.sh
   ```

2. **List available workflows**:

   ```bash
   ./run-workflows-local.sh list
   ```

3. **Run specific workflow**:
   ```bash
   ./run-workflows-local.sh ci push
   ./run-workflows-local.sh preview pull_request
   ```

## Available Commands

### Workflows

- `ci` or `main` - Main CI/CD pipeline
- `preview` - PR preview workflow
- `deps` - Dependency management
- `release` - Release workflow
- `all` - Run all workflows sequentially

### Events

- `push` - Simulate push event (default)
- `pull_request` - Simulate PR event
- `release` - Simulate release event
- `schedule` - Simulate scheduled event

### Options

- `-h, --help` - Show help message
- `-v, --verbose` - Enable verbose output
- `-d, --dry-run` - Show commands without executing
- `--no-cache` - Disable Docker layer caching
- `--reuse` - Reuse containers for faster runs

## Configuration

### Environment Variables

1. Copy the example file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Customize `.env.local` with your settings:
   ```bash
   NODE_ENV=development
   CI=true
   GITHUB_REPOSITORY=Ahmed-Shehzad/Portfolio
   ```

### Secrets (Optional)

1. Copy the example file:

   ```bash
   cp .secrets.example .secrets
   ```

2. Add your tokens to `.secrets`:

   ```bash
   SONAR_TOKEN=your_actual_token
   GITHUB_TOKEN=your_github_token
   ```

   **⚠️ Important**: Never commit `.secrets` file!

## Examples

### Basic Usage

```bash
# Run main CI pipeline
./run-workflows-local.sh

# Run with verbose output
./run-workflows-local.sh ci push --verbose

# Dry run to see what would execute
./run-workflows-local.sh preview pull_request --dry-run
```

### Advanced Usage

```bash
# Run all workflows (interactive)
./run-workflows-local.sh all

# Run specific jobs only
act -W .github/workflows/ci.yml -j quality

# Run with specific platform
act -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

## Workflow-Specific Notes

### CI Pipeline (`ci.yml`)

- **Quality job**: Linting, TypeScript, formatting
- **Test job**: Unit tests with coverage
- **Build job**: Production build
- **Security job**: Dependency auditing
- **Documentation job**: AsciiDoc validation
- **SonarQube job**: Code analysis (requires SONAR_TOKEN)

### Preview Workflow (`preview.yml`)

- Builds PR previews
- Requires `pull_request` event
- Simulates Vercel deployment

### Dependencies (`deps.yml`)

- Automated dependency updates
- Security vulnerability scanning
- Package audit reporting

### Release (`release.yml`)

- Semantic versioning
- Changelog generation
- GitHub release creation

## Troubleshooting

### Common Issues

1. **Docker not running**:

   ```bash
   # Start Docker Desktop or daemon
   docker info  # Should not error
   ```

2. **Permission denied**:

   ```bash
   chmod +x run-workflows-local.sh
   ```

3. **Act command not found**:

   ```bash
   # Reinstall act
   brew install act
   ```

4. **Workflow timeouts**:

   ```bash
   # Use faster platform image
   act -P ubuntu-latest=catthehacker/ubuntu:act-latest
   ```

5. **Memory issues**:
   ```bash
   # Increase Docker memory limit in Docker Desktop settings
   # Or use --reuse flag for container reuse
   ./run-workflows-local.sh ci --reuse
   ```

### Performance Tips

1. **Use container reuse**:

   ```bash
   ./run-workflows-local.sh ci --reuse
   ```

2. **Cache Docker layers**:

   ```bash
   # Default behavior, or disable with --no-cache
   ```

3. **Run specific jobs**:

   ```bash
   act -W .github/workflows/ci.yml -j quality
   ```

4. **Use local Docker registry** (advanced):
   ```bash
   # Pre-pull images
   docker pull catthehacker/ubuntu:act-latest
   ```

## Security Considerations

- ✅ `.secrets` file is gitignored
- ✅ Only example files are committed
- ✅ Use minimal required permissions
- ⚠️ Don't use production tokens in local testing
- ⚠️ Review workflow outputs for sensitive data

## Resources

- [Act Documentation](https://github.com/nektos/act)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub - Act Images](https://hub.docker.com/u/catthehacker)
- [Act Troubleshooting](https://github.com/nektos/act/blob/master/TROUBLESHOOTING.md)
