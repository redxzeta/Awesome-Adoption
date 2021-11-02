# Contribution Guidelines

The current issue labels being handled are features, enhancements, and bugs.

### Setup
- fork repo and clone it 
- switch branch to `paw-dev` unless instructed to switch to another branch
- use yarn to install `node-modules`

### Feature Issue

This issue is meant for functional changes. Please provide the following information:

- The feature description
- Description of the implementation
- Why this would be a good `feature` to add

### Assigning Issues

Issue is First Come First Serve

- Please do not open a pull request to an already assigned issue unless it is an open issue
- Let me know in Discord if you are having problems with the issue

### Enhancement Issue

This issue is meant for non-functional changes. Please provide the following information:

- The enhancement description
- How you will add this enhancement
- Why this would be a good `enhancement` to add

### Bug Issue

This issue is meant for potential bugs. Please provide the following information:

- Bug description
- How to reproduce bug
- Technical specifications

### Pull requests

Brief walkthrough on what changes being done:

- Issue or Feature being implemented
- Short summary of what is being done
- Make a pull request to target branch and not `main`

### Update your fork

Is your fork not up-to-date with the code? Most of the time that isn't a problem. But if you like to "sync back" the changes to your repository, execute the following command:

The first time:

```
git remote add upstream https://github.com/redxzeta/Awesome-Adoption.git
```

After that your repository will have two remotes. You could update your remote (the fork) in the following way:

```
git fetch upstream
git checkout <your feature branch>
git rebase upstream/main
..fix if needed and
git push -f
```

if `rebase` won't work well, use `git merge main` as alternative.

It's also possible to send a PR in the opposite direction, but that's not preferred as it will pollute the commit log.
