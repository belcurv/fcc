build.to.learn | virtual VPS deployment

### PURPOSE

In the world of web hosting, you can broadly separate hosting services into three categories:

1.  _shared hosting_ - Inexpensive hosting, good for hosting static sites, usually with no control over the backend (often apache, PHP5, MySQL). Impossible to serve Node apps via shared hosting services.

2.  _dedicated server_ - Expensive but 100% flexible. You install your own physical server in your provider's colocation facility. You can practically do whatever you want since you don't share this hardware with anyone else. You pay for the rack space(s) and your bandwidth.

3.  _VPS_ - Usually more expensive than shared hosting but much less than dedicated. Budget VPS providers are putting price pressure on shared hosting providers. You get a logical 'container' (Docker, KVM, etc) that acts like a dedicated server but shares hardware resources with other VPSes deployed on that hardware. Containers are like virtual machines, except each container isn't a 100% self-contained "machine". Containers will share a kernel and other low-level systems. Think _Digital Ocean Droplets_. **This is what we're going to emulate.**

We're going to simulate deploying multiple Node apps to a VPS (Virtual Private Server). Instead of subscribing to and paying for actual VPS hosting, we'll use a Virtual Machine as our "VPS".

Throughout this document I will be using linux terminal commands, both for the server configuration and for client operations. Once our linux server VM is provisioned and deployed, we will interact with it using SSH. Windows users can use the classic [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) Telnet/SSH client.

### DEFINITIONS

* **host** - your computer's main operating system.

* **guest** - virtual machines running in/on your host.

### SETUP

**Required bits and pieces:**

* 64-bit host OS (Windows, Mac, Linux) with a dual-core CPU (2 physical cores) at least 4GB of RAM

* CPU with hardware support for virtualization (Intel VT-x or AMD-v) - required for 64bit VMs, regardless of the host

* VirtualBox software for your host OS (Windows, Mac, Linux): [VirtualBox downloads](https://www.virtualbox.org/wiki/Downloads)

* Ubuntu Server 16.04 LTS ISO image: [Ubuntu Downloads](https://www.ubuntu.com/download/server)

**Installation:**

Install VirtualBox however your host OS installs stuff.  In Windows, VirtualBox will ask you before installing drivers for its virtual network adapters, etc.  Say OK to these prompts.  When you're done, you'll have an empty VirtualBox Manager waiting for you to create some VMs. So let's do that.

1. Create a new Virtual Machine by clicking on blue "New" button.

2. Give it a name of your choosing

3. Type: Linux

4. Version: Ubuntu (64-bit)

5. Memory size: 1024 MB minimum. This is memory "stolen" from your host OS. So don't go crazy - 2048 is the max you should allocate.

6. Hard disk: Create a virtual hard disk now

7. Click "Create" - this opens the Create Virtual Hard Disk dialog

8. Leave all defaults as-is **except file size** - 8 GB is not large enough if you plan to continue using this VM beyond simple demo use. Increase this to something like 20 - 24 GB.

9. Click "Create"

Congratulations, you've created a new virtual machine. Pretty easy! It's just an empty box; we haven't installed the OS yet. Before we do, we need to make one configuration change. By default, a virtual machine is "sandboxed" from your local machine and LAN. That's good for security, but it makes the VM inaccessible from other machines on your LAN. Since we **do** need to access our server from other client machines, we'll need to change that:

1.    Click on your VM (or make sure it's highlighted) and click the "Settings" button.
2.    In the "Network" tab, change `Attached to: NAT` to `Attached to: Bridged Adapter`

Next,

1.  in the "Storage" info box for your VM, click on `[Optical Drive] Empty` next to "IDE Secondary Master"

2.  select "Choose disk image..."

3.  Browse to wherever you saved the Ubuntu Server 16.04 LTS ISO file.

4.  **Click "Start"** to boot your VM!  Follow the setup steps to install Ubuntu Server.

https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
