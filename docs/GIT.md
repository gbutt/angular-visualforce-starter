What is Git?
============

Git is a version control system similar to CVS or SVN.
It is useful for the following tasks:
+ Tracking changes to source code.
+ Creating branches to develop code changes in isolation.
+ Keeping a history of changes made with comments about the changes.
+ Merging code from various developers and resolving conflicts.
+ Git is a distributed VCS, meaning that the entire repository with full history is contained locally.
  This is a noted difference from SVN where the SVN server is the only system with the full history.

Git's distributed nature gives it several advantages over SVN:
+ Developers can see the full history of changes without being connected to the SVN server.
  They can also commit changes, merge other branches, and do any other development activity without being connected.
  You only need to be connected in order to push your changes or pull the changes of other team members.

+ All merges are done locally and committed to the remote server.
  You do not need to publish changes to the server in order to resolve merge conflicts.
  In fact the remote branch will be stable and available to other developers while you're resolving your merge conflicts.

+ Anyone can create a branch on their local repository without pushing it to the remote system.
  You can create an experimental branch to try something new.
  If you don't like the results you can always switch back to the main development branch.
  Or you can hold on to the branch if you think it will prove useful in the future.

+ You can make multiple commits locally without having to push and share them with the rest of your team.
  This is particularly useful if you are not sure if your changes will break your team's code.

Getting Git
===========
You can download the latest version of git from their homepage: <https://git-scm.com/>
Here you will find downloads, documentation, and other resources.

Git was developed for Linux systems and it can be used natively with any bash shell.
For Windows users, the git installer will also install a git bash shell.

GUI Clients:
While git is great by itself, some prefer to have a richer experience than that provided by the commandline.
For these users there are several git guis to choose from.
+ `git gui` is a gui client that comes packaged with git.
+ [GitHub Desktop](https://desktop.github.com/) is a gui provided by Github for use with Github.
+ [SmartGit](https://www.syntevo.com/smartgit/) is a commercial gui client for Mac/Windows/Linux.
  I personally use SmartGit for tasks that are better with a visual tool: resolving merge conflicts, viewing log history, etc.

Using Git
=========

### Git CLI
Git is designed to be used from the commandline.
To use a git command you type `git <command>`.
Most of the CLI commands translate directly into git GUIs, so we will focus this documentation on how to use the CLI.

### Git Help
You can view a list of git commands by typing `git`.
This will show you a list of commands you can use in git.
You can view the man-page for any git command by typing `git help <command>`.
You can browse the man-page using the arrow keys, or page up/down.
You can exit the man-page by typing `q`.

### Cloning
Let's start by cloning an existing repository from Github using `git clone`:
```
> git clone https://github.com/gbutt/angular-visualforce-starter.git
```
This will create a new directory called angular-visualforce-starter that is essentially a copy of the git repository.

### Viewing Changes
You can see any changes to the source code with the command `git status`:
```
> git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	GIT.md

nothing added to commit but untracked files present (use "git add" to track)
```
This will show you new files (untracked files), changed files, deleted files, etc.

As the output says, you can add an untracked file to your staging area using `git add`:
```
> git add GIT.md
```
This will add the untracked file to your staging area.
Now if you call `git status` you will see this file has been staged for commit:
```
> git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   GIT.md

```
If you make any further changes to this file it will need to be staged again.
You can use `git status` to see these changes.
```
> git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   GIT.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   GIT.md
```
Note how the file is listed both under staged and not staged.

### Committing

Next we will add our modified file and commit it with `git commit`
```
> git add GIT.md

> git commit -m "create documentation for git"
[master a8946c3] create documentation for git
 1 file changed, 95 insertions(+)
 create mode 100644 GIT.md
```
The flag `-m` is used to add a comment to your commit.
You can omit this flag and git will open `vim` for you to add your comment.
In vim, you must
+ type  `i` to switch to insert mode
+ enter your comment
+ hit `esc` to exit insert mode
+ type `:wq` to save your changes and exit.

Committing will create a changeset that we can push to our remote repository on Github.
It is also possible to view changes made to a file between commits.

### Pushing Changes to Github
Before pushing your changes with `git push` it is a good idea to pull any changes that might have been made by a team member using `git pull`.
```
> git pull
Current branch master is up to date.

> git push
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 2.12 KiB | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
To git@github.com:gbutt/angular-visualforce-starter.git
   3989877..94d4238  master -> master
```

### Creating a New Branch
One of the most powerful features in git is the ability to create branches.
You can create a new branch with `git checkout -b <branch_name>`
```
> git checkout -b new_branch
M	GIT.md
Switched to a new branch 'new_branch'
```
This will create a new branch called 'new_branch' and switch your working directory to this branch.
Your new branch will be based on your current branch.
All changed files will follow you to your new branch.

You can make changes and do anything you want on this branch without affecting your main branch.
```
> git add GIT.md

> git commit -m "changes on a new branch"
[new_branch 4e9dd64] changes on a new branch
 1 file changed, 22 insertions(+), 1 deletion(-)

> git push
fatal: The current branch new_branch has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin new_branch

```
Note that our call to `git push` failed to push our changes to Github.
That is because our branch only exists in our local git repository.
If we want to add this branch to Github we would use the suggested command:
```
> git push --set-upstream origin new_branch
```
This will create the branch in the remote repository called `origin`, which for us is Github.

### Merging a Branch
Now that we have some changes in another branch, let's merge it back to our main branch.
First we need to switch to our main branch.
We do this using `git checkout <branch_name>`.
```
> git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
```
Next we need to merge the changes we made in new_branch into our current branch using `git merge <branch_name>`.
```
> git merge new_branch
Updating 94d4238..4e9dd64
Fast-forward
 GIT.md | 23 ++++++++++++++++++++++-
 1 file changed, 22 insertions(+), 1 deletion(-)
```
If all goes well we should be able to do a fast-forward merge.
This means that all changes merged cleanly and there were no conflicts.
A fast forward merge will also auto-commit the changes.

If things do not go well you will see an auto-merge conflict:
```
> git merge new_branch
Auto-merging GIT.md
CONFLICT (content): Merge conflict in GIT.md
Automatic merge failed; fix conflicts and then commit the result.
```
The conflicting file will need to be fixed, staged and committed before you can continue development.
Git uses the following convention when merging a file with conflicts:
```
<<<<<<< HEAD
The code as it existed in the current branch is here.
=======
The code as it existed in the merged branch is here.
>>>>>>> new_branch
```
Everything between <<<<<<< HEAD and >>>>>>> new_branch needs to be resolved.
You can do this by hand or use a mering tool. But whatever you do, DO NOT CHECK IN THE CODE BEFORE RESOLVING.
It won't compile.

A simple strategy is to use the file as it exists in your current branch.
You can do this with `git checkout --ours <file_name>`.
If you'd prefer to take the code from the merged branch you can do this with `git checkout --theirs <file_name>`.
Once you've resolved the conflicts you will need to stage the files you resolved and finish the merge commit.
```
> git add GIT.md
> git commit
```
