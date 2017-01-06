# VIRTUAL BOX

Using virtual machines for testing is convenient and saves us from having to actually install / configure / break stuff on our physical desktop machines.  This post will collect the basic steps to install Oracle's Virtual Box (free).

### Basic steps:

1. Download a 32-bit LTS version of Ubuntu (from [here][1]) or Xubuntu (from [here][2]).  Xubuntu is lighter weight and uses a much more intuitive desktop manager than Ubuntu.
2. While that's downloading, grab Virtual Box and install it.
3. Launch Virtual Box and create a new virtual machine.
4. Don't launch it yet.  First edit the machine's settings, networking, "Attached to" -> set to "Bridged Adapter" (deviation from above linked guide - see below)
5. "Install" the Ubuntu/Xubuntu ISO you downloaded.
6. Install guest additions (deviation from above linked guide - see below).
7. Install Git, etc. (separate guide)

### Some terminology:
**Host Machine:** this is your regular desktop, not the virtual machine.  The host hosts one or more virtual machines, called guests.

**Guest Machine:** this is the virtual machine, running in software within the host machine.

### Fix for quiet audio:
Modern Ubuntu versions include the 'alsa' audio server.  Your volume control applet will work to raise/lower volume, but - if you're install is like mine - even at 100% volume it will be too quiet.  This is because there's a separate, somewhat-hidden volume mixer working behind the scenes: **alsamixer**.

You access it via terminal:

`$ alsamixer`

Arrow keys left & right until MASTER is highlighted, and up/down arrow keys to adjust.  I set my MASTER to 100% and then use the volume control panel applet up near the clock to tweak.


## NETWORKING

Ok, so the reason we set Networking / Attached To: Bridged Adapter is so the virtual machine is visible to our host machine and other hosts on your local network.  If you leave this setting to default (NAT, in my case), Virtual Box sandboxes the guest from the host.  In my case, the virtual guest was assigned an IP address from a different network than my home's LAN.  Well, if we want out VMs to act as web servers, they need to be accessible from other computers on the network.  Selecting "Bridged Adapter" solves this by giving the guest machine access to the host machine's network interface.

## GUEST ADDITIONS

Guest Additions allow dynamic guess OS window resizing.  You need to install guest additions to resize or fullscreen your VM.

sudo apt-get install virtualbox-guest-dkms

Instead, you can install guest additions directly from VirtualBox:

1. start your VM and log into Xubuntu/Ubuntu

2. once the system has settled, open a terminal (Ctrl-Alt-T)

3. update apt (enter your password when prompted):

    `sudo apt-get update`

4. install some stuff (answer Y to the prompts):

    ```
    $ sudo apt-get install dkms
    $ sudo apt-get install build-essential
    ```

    (By the way, build-essential is **essential** for all kinds of other dev tools.  Install this no matter what.)

5. reboot your server from the user/power menu

6. log back into Xubuntu/Ubuntu

7. at the top of the VirtualBox machine window, click on the Devices menu -> Insert Guest Additions CD Image. This should mount a CD image on your desktop.

8. open a terminal (Ctrl-Alt-T)

9. change directory to the media directory:

10. list the directory: `ls`.  You should see something called: **VBoxLinuxAdditions.run**

11. run that: `sudo ./VBoxLinuxAdditions.run`

12. reboot your VM via the power menu

[1]: http://www.ubuntu.com/download/desktop
[2]: http://xubuntu.org/getxubuntu/
