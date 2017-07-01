build.to.learn | virtual VPS deployment

### CONTENTS

1.  [Introduction](#introduction)
2.  [Definitions](#definitions)
3.  [VirtualBox Setup](#virtualbox-setup)
4.  [Ubuntu Server Installation](#ubuntu-server-installation)

### INTRODUCTION

We're going to simulate deploying multiple Node apps to a VPS (Virtual Private Server). Instead of subscribing to and paying for actual VPS hosting, we'll use a Virtual Machine as our "VPS".

Throughout this document I will be using linux terminal commands, both for the server configuration and for client operations. Once our linux server VM is provisioned and deployed, we will interact with it using SSH. Windows users can use the classic [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) Telnet/SSH client.

### DEFINITIONS

In the world of web hosting, you can broadly separate hosting services into three categories:

1.  _shared hosting_ - Inexpensive hosting, good for hosting static sites, usually with no control over the backend (often apache, PHP5, MySQL). Impossible to serve Node apps via shared hosting services.

2.  _dedicated server_ - Expensive but 100% flexible. You install your own physical server in your provider's colocation facility. You can practically do whatever you want since you don't share this hardware with anyone else. You pay for the rack space(s) and your bandwidth.

3.  _VPS_ - Usually more expensive than shared hosting but much less than dedicated. Budget VPS providers are putting price pressure on shared hosting providers. You get a logical 'container' (Docker, KVM, etc) that acts like a dedicated server but shares hardware resources with other VPSes deployed on that hardware. Containers are like virtual machines, except each container isn't a 100% self-contained "machine". Containers will share a kernel and other low-level systems. Think _Digital Ocean Droplets_. **This is what we're going to emulate.**

**Other**

* _host_ - your computer's main operating system.

* _guest_ - virtual machines running in/on your host.


### VIRTUALBOX SETUP

**Required bits and pieces:**

* 64-bit host OS (Windows, Mac, Linux) with a dual-core CPU (2 physical cores) at least 4GB of RAM

* CPU with hardware support for virtualization (Intel VT-x or AMD-v) - required for 64bit VMs, regardless of the host

* VirtualBox software for your host OS (Windows, Mac, Linux): [VirtualBox downloads](https://www.virtualbox.org/wiki/Downloads)

* Ubuntu Server 16.04 LTS ISO image: [Ubuntu Downloads](https://www.ubuntu.com/download/server)

**Installation:**

Install VirtualBox however your host OS installs stuff.  In Windows, VirtualBox will ask you before installing drivers for its virtual network adapters, etc.  Say OK to these prompts.  When you're done, you'll have an empty VirtualBox Manager waiting for you to create some VMs. So let's do that.

1.  Create a new Virtual Machine by clicking on blue "New" button.

2.  Give it a name of your choosing

3.  Type: Linux

4.  Version: Ubuntu (64-bit)

5.  Memory size: 1024 MB minimum. This is memory "stolen" from your host OS. So don't go crazy - 2048 is the max you should allocate.

6.  Hard disk: Create a virtual hard disk now

7.  Click "Create" - this opens the Create Virtual Hard Disk dialog

8.  Leave all defaults as-is **except file size** - 8 GB is not large enough if you plan to continue using this VM beyond simple demo use. Increase this to something like 20 - 24 GB.

9.  Click "Create"

Congratulations, you've created a new virtual machine. Pretty easy! It's just an empty box; we haven't installed the OS yet. Before we do, we need to make one configuration change. By default, a virtual machine is "sandboxed" from your local machine and LAN. That's good for security, but it makes the VM inaccessible from other machines on your LAN. Since we **do** need to access our server from other client machines, we'll need to change that:

1.  Click on your VM (or make sure it's highlighted) and click the "Settings" button.

2.  In the "Network" tab, change `Attached to: NAT` to `Attached to: Bridged Adapter`

Next,

1.  in the "Storage" info box for your VM, click on `[Optical Drive] Empty` next to "IDE Secondary Master"

2.  select "Choose disk image..."

3.  Browse to wherever you saved the Ubuntu Server 16.04 LTS ISO file.

4.  **Click "Start"** to boot your VM!

### UBUNTU SERVER INSTALLATION

Setting up Ubuntu Server is pretty straightforward. Expect it to take about 30 minutes. An ASCII menu system will guide you through the configuration steps. Example choices are in [brackets]:

1.  Select Ubuntu Installer Language to use throughout the isntallation process. [English]

2.  Select "Install Ubuntu Server" and press enter.

3.  Select your Operating System Language. [English]

4.  Select your server's location. This helps in determining timezone. [United States]

5.  Configure the keyboard. Unless you are using a special keyboard, you may skip keyboard detection. [No]

6.  Configure the network with DHCP. Your server should automatically receive an IP address from your LAN's DHCP server (typically your router). We'll manually change to a static IP address later.

7.  Hostname. Think of this as your server's nickname. Pick something short, easy to remember, and omit spaces or special characters. [ubuntu-server]

8.  Server User full name. Provide a full name for the primary account. This is not the root (administrator) user but this user can temporarily gain admin privileges using the sudo command. [jay]

9.  Server Username. Provide the login username for the primary account. [jay]

10. Server User Password. Create a new password for the user created previously. [yeahright]

11. Home Directory Encryption. You do not have to encrypt your home directory. [No]

12. Confirm Timezone. The installer should automatically pick your timezone. Confirm. [Yes]

13. Partition Disks. This can get very complicated if you are deploying a real server with multiple hard disks, but we have a VM "blank slate" with only a single virtual hard drive. So in our case, it's easy! Pick option 1: "Use entire disk". This will format the entire _virtual disk_ we created during initial VM setup.

14. Confirm Partition Scheme. You should see two partitions: a root `/` partition and a `swap` partition. That's fine for our purposes. If we were setting up a desktop VM guest, I recommend manually creating a separate `/home` partition, but that is beyond the scope of this guide. [Finish partitioning and write changes to disk]

15. Write the Partition Changes to Disk. [Yes]

16. Wait while the installer installs the Ubuntu Server base system.

17. HTTP Proxy Information. We don't need a proxy - leave blank. [Continue]

18. Configuring Apt. `Apt` is used to install software from Ubuntu's software repository. Wait for this to complete.

19. Setup Automatic Updates. Since this is just a demo server that will not run 24/7, we don't need automatic updates. Instead we'll use Apt as needed to check for and install updates. [No automatic updates]

20. Software Selection. Use <tab> the up/down arrow keys to navigate the menu. "Standard System Utilities" should already be selected. We also need OpenSSH server - use spacebar to select it. Then <tab> to highlight [Continue]

21. ... A lot of waiting while Ubuntu installs stuff ...

22. GRUB Bootloader Notification. GRUB manages the booting of the operating systems on your VM. You could have multiple OSes in a dual/multi-boot environment, but our VM has only one. Install GRUB to the master boot record? [Yes]

23. Wait while the installer installs GRUB and finishes the Ubuntu Server installation.

24. Installation complete - reboot. Do should not have to "remove" the Ubuntu Server 16.04 ISO image from VirtualBox manager, it should be removed for you. [Continue]

25. On reboot, you will briefly see the GRUB bootloader. `*Ubuntu` will be highlighted - nothing to do but wait 3 seconds.

26. Watch a ton of text scroll by rapidly as Ubuntu initializes and boots.

27. Eventually you'll be greeted by a login prompt. Login with the username and password previously created.

Wecome to the Ubuntu cli! 

_todo..._

https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
