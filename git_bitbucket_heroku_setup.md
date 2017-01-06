 # **GIT, BITBUCKET AND HEROKU**

## **INITIAL SETUP**

Before we can use Git to communicate with Bitbucket and Heroku, we need to add our SSH public key to those services.  This facilitates authentication via *asymmetric cryptography key exchange*.  SSH keys are created in pairs, as a public key and a private key.  We give remote servers our *public key*.  The *private key* stays private.

You may already have SSH keys.  If not, you need to create the key pair on each computer you will use to connect to the remote services.  In my case, I work from a desktop PC and a laptop - so I had to generate SSH keys separately for both machines and add them to Bitbucket and Heroku.

To check if you already have SSH keys, in terminal:

    $ ls -al ~/.ssh

That may return an empty directory, or a directory containing some files.  We're looking specifically for these two files:

    id_rsa
    id_rsa.pub

The file ending in .pub is your **public key** - the one you can give out to the whole world without concern.  Never give out your private key.  I didn't have them (I didn't even have a .ssh folder), so I had to create them.

**To create a key pair**, run the following in terminal (replace user@email.com with your email address):

    $ ssh-keygen -t rsa -b 4096 -C "user@email.com"

Accept all the defaults & leave both pass-phrases blank.  You now have a SSH key pair.  You can verify this by re-running:

    $ ls -al ~/.ssh

Now we need to add the public key to Bitbucket and Heroku.  In both cases, you do this on their web sites under user settings or manage account.  You have to copy and paste the public key mumbo-jumbo into each website.  This is slightly more difficult than it sounds, because the key is one long string of random characters, and it has to be copied **exactly**.

So first we have to open the file `id_rsa.pub`.  Use a modern, real text editor.  I first tried the `more` command line utility, but it inserts some extra junk into the key string preventing it from pasting correctly.  I then tried the linux app *nano* but it did the same.  I ultimately used Gedit (an editor included with the Gnome linux desktop environment) and was able to copy & paste the string correctly.  Your system may have a different text editor; you may have to try a few before it works correctly.

You have to copy the whole line, including the leading "ssh-rsa" and the trailing email address.  You'll know if it's messed up when you paste it into Heroku - Heroku should label the SSH key with your email address.  If it's randome gibberish instead, you didn't copy the string correctly.

---

## **BITBUCKET**

**What is Bitbucket**

Bitbucket is an online code repository.  It's used to host code or other works.  The most popular online repository is Github, but they do not offer free **private** repositories.  Bitbucket does, for teams of up to 5 members.  They are otherwise very similar.  Importantly, **both use Git**.  Like Github, Bitbucket is basically just a data store of documents.  Nothing runs from a repository.  Bitbucket doesn't communicate with a web server or hosted service like Heroku.

What's the point of a repository?  The main point is code management.  Historical versions of each file are maintained; if some code change breaks the app you can revert to a previous version.  You can invite others to work on your project and limit members to specific components.  You can 'fork' existing code into a new project.  All sorts of code management functions.  With large projects, this is critical.  With our project, we will have many separate modules - each their own file - connecting with each other, and each of those will require version control for tracking and testing changes.  For this we will use Git.

---

## **HEROKU**

### **What is Heroku**

Heroku is a PaaS provider (Platform as a Service).  For our purposes, think of them like a web hosting provider.  But they're different in that we get to specify what sorts of environment(s) our web applications use.  Unlike a traditional web host, there's no FTP or web-based file upload utilities.  You use Git to 'push' an app to Heroku, just like you do with Bitbucket.

How does Heroku know how to deploy an app?  I'm not sure about all cases, but in our case we will deploy a Node.js application.  Node.js uses a file called package.json to describe properties of an app.  When we use Git to push the app to Heroku, we push package.json too.  Heroku watches for package.json, reads it, and knows exactly how to structure the app.  Genius!

### **Using Heroku**

First, install [Heroku Toolbelt][3].  This installs the command line utilities we need to interface with Heroku.  These commands are issued from the root folder of our app.

### Useful commands:

Command     |    Description
------------|---------------
`heroku create` | Initializes a new Heroku app.  Run this first, obviously. This also adds the heroku remote automatically, naming it 'heroku'.
`git push heroku master` | Pushes our code to Heroku!  It's that simple!  App is live.  Subsequent pushes can omit 'master'.
`heroku open` | Launches the app in your default browser.
`heroku rename {newname}` | Renames the app; replace {newname} with the name, for example: `heroku rename mothergrabber-test-server`
`heroku git:remote -a {app name}` | Replace {app name} with the app's actual name.  Connects a local repo with an existing Herorku app.

---

## **GIT**

**What is Git**

Git is a version control system.  There are other version control systems (Mercurial and Svn are/were also popular), but Git is by far the most popular.

> ### [Version control][1]
>
> A component of software configuration management, version control, also known
> as revision control or source control, is the management of changes to
> documents, computer programs, large web sites, and other collections of
> information. Changes are usually identified by a number or letter code,
> termed the "revision number," "revision level," or simply "revision." For
> example, an initial set of files is "revision 1." When the first change is
> made, the resulting set is "revision 2," and so on. Each revision is
> associated with a timestamp and the person making the change. Revisions can
> be compared, restored, and with some types of files, merged.
>

Git can be used locally, on an individual computer.  Or centrally, with versions stored on a remote server called a **repository**.  Git is a command line utility that you have to install ([installation instructions][2] for all platforms).  Specific Git commands are used to *clone* an entire repository to your local machine, *add* changed files to a local cache, *push* those changes to repositories, or *pull* changed files from a repository to work on them locally.  **We will use Git to initialize or clone this project, commit changes, and push files to a Bitbucket repository.**  Heroku also relies on Git; it's how we *push* the project to Heroku.

### **Fisrt-Time Git Setup**

Before we can start issuing Git commands we have to do a little configuration (taken from this [comprehensive Git config guide][4]).  Specifically, we need to set our global identity (user name & email address). This is important because every Git commit uses this information, and it’s immutably baked into the commits you start creating. In terminal:

    $ git config --global user.name "John Doe"
    $ git config --global user.email johndoe@example.com

There's two more settings that aren't necessary yet, but will be when Git version 2 rolls around:

    $ git config --global push default matching
    $ git config --global alias.co checkout

That out of the way, we can begin using Git.  There are basically 2 use-cases: **new** projects and **existing** projects.

### New Project:

Assuming we have not created a local or remote repository; we're just starting out.  First, we need Git to initialize a project.  In terminal, navigate to your project's root directory and:

    $ git init

This gives us access to a whole bunch of new commands (below) and creates a hidden .git folder in the project root.  DON'T MODIFY THE SHIT IN HERE.  

But before we get Git-ing, create a new hidden file called .gitignore.  This file lets us specify files and folder that we don't want git to track.  Git will not watch them for changes, nor commit or push them to repositories.  In our case, we'll add *node_modules* to .gitignore.  Create the file any way you want, but it MUST be called .gitignore (with the 'dot' - that's what tells the OS that it's a hidden file).  Just add the following to the first line in .gitignore:

    node_modules/
    
We don't track node_modules because it's not worth the storage space or bandwidth.  Those aren't our files either, so they won't be changing.  And we don't need them stored - Node.js can easily rebuild node_modules by issuing `npm install` in the root folder of the project.  That command looks at the dependencies listed in package.json and installs all the needed modules.

#### Create a remote Bitbucket repository

Before we can push code to Bitbucket we have to create a remote repository and add it to our local project. To create the repository, you just point/click in the BitBucket menu.

Once you create the repo, Bitbucket will give you the command line path required to interact with it:

    $ git remote add origin git@bitbucket.org:userName/repoName.git

Breaking that down...

```
git remote add                          = Git's command to add a remote repo
origin                                  = Assigns the repo ID: "origin"
git@bitbucket.org:userName/repoName.git = The URI of the repo
```

### Existing Project

Assuming you want to participate in an existing project, either your own or someone else's, you need to get the code from the remote repository. You use `git clone` for this.  For example, to clone this project:

    $ git clone git@bitbucket.org:userName/repoName.git

That creates a new folder called 'repoName' and downloads all the files from Bitbucket to that folder. Simple.  After cloning a repo, you will need to run `npm install` to tell NodeJS to install all the dependent modules (the modules we ignored previously).

Then connect your local project to an existing Heroku repository:

    $ heroku git:remote -a your-heroku-app-name

### Finally - Pushing Code

Now that we're connected to a remote repo, we can push code to BitBucket!

    $ git push origin master
    $ git push heroku master

That's it!  Subsequent pushes to Bitbucket don't need 'origin master'; origin & master are assumed if not specified.


** More Git Basics: ** https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository

## Common Git commands:

Command       | Description
------------- | -------------
`git status`  | Shows files that git is watching, and any that have not been saved.
`git add -A`   | Saves everything in the project directory.  This will include node_modules unless we ignore it (see above). We ignore node_modules because anyone (including Heroku!) can reinstall them at any time based on package.json! There's no sense controlling 3rd party modules this way.  Ignore them.
`git rm --cached -r node_modules` | In case you forget to ignore node_modules, this command removes it from git cache.
`git commit -am "Message"` | Makes a commit. Switches -a = "add" every file git knows about; -m = lets us specify a "message"
`git remote add origin {url}` | Adds a remote repository to the current project. Replace {url} with the actual url of the repo.  Bitbucket gives us copy/paste code for this. Heroku takes care of this (see below).
`git remote -v` | Lists all attached remote repositories.  You can have multiple connected repositories.  We will have Bitbucket and Heroku.
`git clone {url}` | Copies a remote repository to your local machine; replace {url} with the repository's address.  For example, `git clone git@bitbucket.org:userName/repoName.git` makes a new folder called 'repoName' and downloads all the files from Bitbucket to that folder. Yay!
`git pull {remote} {branch}` | updates your local working repo with changes from a remote repo.  For example, from inside your local project's root folder, issue: `git pull origin master` to grab all the changes made to the Bitbucket master repo.




[1]: https://en.wikipedia.org/wiki/Version_control
[2]: http://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[3]: https://toolbelt.heroku.com/
[4]: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup
