---
created: 2023-03-08T14:49
modified: 2024-08-30T10:57
---
# Chung
## Công cụ cài đặt
Có 3 công cụ phổ biến và có trong Kubernetes docs là:
- kubeadm
- kOps
- Kubespray
kOps chỉ hỗ trợ triển khai trên các cloud service như AWS, GCP. Bản thân Kubespray bên dưới cũng sử dụng kubeadm. VTS hiện tại cũng dùng kubespray để cài cloud. Vì sử dụng ansible nên có thể đứng từ một node để cài đặt một cluster, thay vì phải vào từng node.
Lựa chọn sử dụng kubeadm cho các cụm nhỏ và cài đặt đơn giản (vì chưa cần có kinh nghiệm về ansible)
### Kubeadm
https://kubernetes.io/docs/reference/setup-tools/kubeadm/
## Lựa chọn và cài đặt các thành phần
### Container runtime
Hai runtime phổ biến nhất
- containerd
	- Nếu lựa chọn containerd thì phải cài thêm [Builtkit + nerdctl](https://github.com/containerd/nerdctl/blob/main/docs/build.md) để build được image
	- containerd `ctr`, containerd `nerdctl`, Kubernetes `crictl`
- docker
	- Tool CLI: docker CLI
### Network plugin
- cái gì đó không phải Flannel vì không hỗ trợ `netpol`



# Kubernetes 1.26.3 - Docker trên 10.30.132.77
Dựa trên note của tungtv@Gem
## Ref
- https://medium.com/@srpillai/single-node-kubernetes-on-centos-c8c3507e3e65
- https://www.centlinux.com/2019/04/install-kubernetes-k8s-offline-on-centos-7.html

Sử dụng root

## Tắt SElinux 
https://www.tecmint.com/disable-selinux-in-centos-rhel-fedora/
- Check status: `sestatus`
- setenforce 0
- sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
## Disable swap
https://www.tecmint.com/disable-swap-partition-in-centos-ubuntu/
- Check: `free -h`
- `swapoff -a`
- `vi /etc/fstab` and comment swap line
## Install RPM
Cần cài libxml2-python và python-kitchen trước
```
[root@testlab-77 rpm]# rpm -ivh --replacefiles --replacepkgs rpm/*
warning: ./0714477a6941499ce3d594cd8e0c440493770bd25b36efdd4ec88eadff25c2ea-kubelet-1.23.2-0.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 3e1ba8d5: NOKEY
error: Failed dependencies:
	libxml2-python is needed by yum-utils-1.1.31-54.el7_8.noarch
	python-kitchen is needed by yum-utils-1.1.31-54.el7_8.noarch

[root@testlab-77 rpm]# yum install libxml2-python

[root@testlab-77 rpm]# yum install python-kitchen

[root@testlab-77 rpm]# rpm -ivh --replacefiles --replacepkgs ./*
warning: ./0714477a6941499ce3d594cd8e0c440493770bd25b36efdd4ec88eadff25c2ea-kubelet-1.23.2-0.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 3e1ba8d5: NOKEY
Preparing...                          ################################# [100%]
Updating / installing...
   1:libaio-0.3.109-13.el7            ################################# [  5%]
   2:device-mapper-libs-7:1.02.170-6.e################################# [ 11%]
   3:device-mapper-7:1.02.170-6.el7_9.################################# [ 16%]
   4:device-mapper-event-libs-7:1.02.1################################# [ 21%]
   5:device-mapper-event-7:1.02.170-6.################################# [ 26%]
   6:lvm2-libs-7:2.02.187-6.el7_9.5   ################################# [ 32%]
   7:device-mapper-persistent-data-0.8################################# [ 37%]
   8:socat-1.7.3.2-2.el7              ################################# [ 42%]
   9:libnetfilter_queue-1.0.2-2.el7_2 ################################# [ 47%]
  10:libnetfilter_cttimeout-1.0.0-7.el################################# [ 53%]
  11:libnetfilter_cthelper-1.0.0-11.el################################# [ 58%]
  12:conntrack-tools-1.4.4-7.el7      ################################# [ 63%]
  13:kubernetes-cni-0.8.7-0           ################################# [ 68%]
  14:kubelet-1.23.2-0                 ################################# [ 74%]
  15:cri-tools-1.19.0-0               ################################# [ 79%]
  16:kubectl-1.23.2-0                 ################################# [ 84%]
  17:kubeadm-1.23.2-0                 ################################# [ 89%]
  18:lvm2-7:2.02.187-6.el7_9.5        ################################# [ 95%]
  19:yum-utils-1.1.31-54.el7_8        ################################# [100%]

```

## Network
https://www.centlinux.com/2019/04/install-kubernetes-k8s-offline-on-centos-7.html
Download https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```
[root@testlab-77 rpm]# cat > /etc/sysctl.d/kubernetes.conf << EOF
> net.ipv4.ip_forward = 1
> net.bridge.bridge-nf-call-ip6tables = 1
> net.bridge.bridge-nf-call-iptables = 1
> EOF
```
```
[root@testlab-77 rpm]# modprobe br_netfilter
[root@testlab-77 rpm]# sysctl --system
```

## Load docker image
```
docker load -i coredns.tar
docker load -i etcd.tar
docker load -i flannel-flannel-cni-plugin-v1.1.2.tar
docker load -i flannel-flannel-v0.21.2.tar
docker load -i kube-apiserver.tar
docker load -i kube-controller-manager.tar
docker load -i kube-proxy.tar
docker load -i kube-scheduler.tar
docker load -i pause.tar
```

```
Loaded image: k8s.gcr.io/coredns/coredns:v1.8.6
Loaded image: k8s.gcr.io/kube-proxy:v1.23.2
Loaded image: k8s.gcr.io/etcd:3.5.1-0
Loaded image: k8s.gcr.io/kube-scheduler:v1.23.2
Loaded image: k8s.gcr.io/kube-apiserver:v1.23.2   
Loaded image: k8s.gcr.io/pause:3.6
Loaded image: k8s.gcr.io/kube-controller-manager:v1.23.2    
Loaded image: flannel/flannel:v0.21.2
Loaded image: flannel/flannel-cni-plugin:v1.1.2
```

## kubelet
https://www.centlinux.com/2019/04/install-kubernetes-k8s-offline-on-centos-7.html
- Chạy `kubeadm init --apiserver-bind-port 8080 --pod-network-cidr=10.244.0.0/16` (tungtv: địa chỉ pod-network-cidr phải giống trong file flannel.yaml "Network": "10.244.0.0/16")
- Lỗi kubelet không chạy
```
systemctl enable kubelet
systemctl start kubelet
```
- báo lỗi `"Failed to run kubelet" err="failed to run Kubelet: misconfiguration: kubelet cgroup driver: \"systemd\" is different from docker cgroup driver: \"cgroupfs\""`  
- Thêm `"exec-opts": ["native.cgroupdriver=systemd"]` vào file `/etc/docker/daemon.json`  
- Restart docker `systemctl restart docker.service`
- Start lại kubelet và check status
- Nếu lỗi, chạy `kubeadm reset`, sau đó chạy `kubeadm init` như trên
```
[root@testlab-77 install]# kubeadm init --apiserver-bind-port 8080 --pod-network-cidr=10.244.0.0/16
W0308 11:16:32.769472  491595 version.go:103] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get "https://dl.k8s.io/release/stable-1.txt": dial tcp: lookup dl.k8s.io on [::1]:53: read udp [::1]:47073->[::1]:53: read: connection refused
W0308 11:16:32.769583  491595 version.go:104] falling back to the local client version: v1.23.2
[init] Using Kubernetes version: v1.23.2
[preflight] Running pre-flight checks
	[WARNING Service-Docker]: docker service is not enabled, please run 'systemctl enable docker.service'
	[WARNING Hostname]: hostname "testlab-77" could not be reached
	[WARNING Hostname]: hostname "testlab-77": lookup testlab-77 on [::1]:53: read udp [::1]:40936->[::1]:53: read: connection refused
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local testlab-77] and IPs [10.96.0.1 10.30.132.77]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost testlab-77] and IPs [10.30.132.77 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost testlab-77] and IPs [10.30.132.77 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 6.503590 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config-1.23" in namespace kube-system with the configuration for the kubelets in the cluster
NOTE: The "kubelet-config-1.23" naming of the kubelet ConfigMap is deprecated. Once the UnversionedKubeletConfigMap feature gate graduates to Beta the default name will become just "kubelet-config". Kubeadm upgrade will handle this transition transparently.
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node testlab-77 as control-plane by adding the labels: [node-role.kubernetes.io/master(deprecated) node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node testlab-77 as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: m9xkjs.tj0vjdi8phtc816o
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.30.132.77:8080 --token m9xkjs.tj0vjdi8phtc816o \
	--discovery-token-ca-cert-hash sha256:85f472213ae864d8969001d430cdbe4a3e016da19c8ee2ec52d93c352d69a5cb 
```
- Làm theo hướng dẫn trên của kubeadm, với từng user muốn sử dụng kubectl
```
[root@testlab-77 install]# mkdir -p $HOME/.kube
[root@testlab-77 install]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@testlab-77 install]# sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## Flannel
```
kubectl apply -f flannel.yml
```
(KHÔNG ĐƯỢC) để tránh lỗi HINFO: read udp 10.244.0.2:36389->8.8.8.8:53: i/o timeout: tên network interface card trong file flannel.yaml phải giống với nic trên server vật lý (--iface=em1)

## Single node
Bỏ taint của master node
`kubectl taint nodes --all node-role.kubernetes.io/master-`

## Change NodePort range
-  Trên node master, edit file `/etc/kubernetes/manifests/kube-apiserver.yaml`
- Add a line after the `--service-cluster-ip-range` as follows: `--service-node-port-range=9900-32767` (default is `30000-32767`)
- Kubernetes sẽ tự động restart pod `kube-apiserver` trên node đó đã được restart thành công hay chưa, nếu đã chạy bình thường, lặp lại thao tác trên node master tiếp theo (đây là một static pod https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-reconfigure/#reflecting-clusterconfiguration-changes-on-control-plane-nodes)


# Kubernetes 1.28 - Docker - VTB
## Cài Container runtime - docker
### Cài docker engine
- Cài theo hướng dẫn: https://docs.docker.com/engine/install/centos/#install-from-a-package
- Tải file cài đặt: https://download.docker.com/linux/centos/7/x86_64/stable/Packages/
	```
	containerd.io-1.6.9-3.1.el7.x86_64.rpm*
	docker-buildx-plugin-0.11.2-1.el7.x86_64.rpm*
	docker-ce-24.0.7-1.el7.x86_64.rpm*
	docker-ce-cli-24.0.7-1.el7.x86_64.rpm*
	docker-ce-rootless-extras-24.0.7-1.el7.x86_64.rpm*
	docker-compose-plugin-2.6.0-3.el7.x86_64.rpm*
	docker-scan-plugin-0.9.0-3.el7.x86_64.rpm
	```
	Thiếu một số package, cần download bằng tay tại https://rpmfind.net/linux/rpm2html/search.php
	```
	container-selinux-2.119.2-1.911c772.el7_8.src.rpm
	fuse-overlayfs-0.7.2-6.el7_8.src.rpm
	slirp4netns-0.4.3-4.el7_8.src.rpm
	```

`Error: docker-ce-selinux conflicts with 2:container-selinux-2.119.2-1.911c772.el7_8.noarch`
--> Bỏ docker-ce-selinux-17.03.3.ce-1.el7.noarch thì cài được

```
sudo yum remove docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```
- Cài trên 10.225.44.40 thì thiếu dependencies nhưng không cài được do lỗi `[Errno 256] No more mirrors to try.`, Cài trên 10.225.44.41-42 thì không thiếu
```
Dependencies Resolved

============================================================================================================================================================================================================================================
 Package                                                 Arch                                 Version                                                 Repository                                                                       Size
============================================================================================================================================================================================================================================
Installing:
 container-selinux                                       noarch                               2:2.119.2-1.911c772.el7_8                               /container-selinux-2.119.2-1.911c772.el7_8.noarch                                41 k
 containerd.io                                           x86_64                               1.6.9-3.1.el7                                           /containerd.io-1.6.9-3.1.el7.x86_64                                             112 M
 docker-buildx-plugin                                    x86_64                               0.11.2-1.el7                                            /docker-buildx-plugin-0.11.2-1.el7.x86_64                                        59 M
 docker-ce                                               x86_64                               3:24.0.7-1.el7                                          /docker-ce-24.0.7-1.el7.x86_64                                                   92 M
 docker-ce-cli                                           x86_64                               1:24.0.7-1.el7                                          /docker-ce-cli-24.0.7-1.el7.x86_64                                               35 M
 docker-ce-rootless-extras                               x86_64                               24.0.7-1.el7                                            /docker-ce-rootless-extras-24.0.7-1.el7.x86_64                                   19 M
 docker-compose-plugin                                   x86_64                               2.6.0-3.el7                                             /docker-compose-plugin-2.6.0-3.el7.x86_64                                        25 M
 docker-scan-plugin                                      x86_64                               0.9.0-3.el7                                             /docker-scan-plugin-0.9.0-3.el7.x86_64                                           13 M
 fuse-overlayfs                                          x86_64                               0.7.2-6.el7_8                                           /fuse-overlayfs-0.7.2-6.el7_8.x86_64                                            116 k
 fuse3-libs                                              x86_64                               3.6.1-4.el7                                             /fuse3-libs-3.6.1-4.el7.x86_64                                                  270 k
 slirp4netns                                             x86_64                               0.4.3-4.el7_8                                           /slirp4netns-0.4.3-4.el7_8.x86_64                                               169 k
Installing for dependencies:
 audit-libs-python                                       x86_64                               2.8.5-4.el7                                             Local_DVD                                                                        76 k
 checkpolicy                                             x86_64                               2.5-8.el7                                               Local_DVD                                                                       295 k
 libcgroup                                               x86_64                               0.41-21.el7                                             Local_DVD                                                                        66 k
 libsemanage-python                                      x86_64                               2.5-14.el7                                              Local_DVD                                                                       113 k
 policycoreutils-python                                  x86_64                               2.5-34.el7                                              Local_DVD                                                                       457 k
 python-IPy                                              noarch                               0.75-6.el7                                              Local_DVD                                                                        32 k
 setools-libs                                            x86_64                               3.3.8-4.el7                                             Local_DVD                                                                       620 k

Transaction Summary
============================================================================================================================================================================================================================================
Install  11 Packages (+7 Dependent packages)

```
Kiểm tra thấy 2 server 10.225.44.41-42 không có yum repo Local_DVD và cài bằng tay (`yum install checkpolicy`) cũng lỗi tương tự. Thử `yum install checkpolicy --disablerepo=Local_DVD` thì lại được vì yum dùng một repo khác (http8181_CentOS7)
### Add user to docker group
Group docker được tự động tạo ra khi cài đặt, add user vào group để tương tác với docker daemon
```
usermod -aG docker <username>
```
Log out and log back in so that your group membership is re-evaluated.
### Move docker data
(https://mrkandreev.name/snippets/how_to_move_docker_data_to_another_location/)
- Stop daemon nếu đã start
	```
	service docker stop
	```
- Tạo/sửa file `/etc/docker/daemon.json` với nội dung
	```
	{
	   "data-root": "/path/to/new/docker/location"
	}
	```
- Copy docker files to new location (nếu đã start trước đó)
	```
	rsync -aP /var/lib/docker/ /path/to/new/docker/location
	```
- Remove old directory (nếu đã start trước đó)
	```
	rm -rf /var/lib/docker
	```
-  Start daemon
	```
	systemctl start docker
	```
### Cài cri-dockerd
>**Note:** Docker Engine does not implement the [CRI](https://kubernetes.io/docs/concepts/architecture/cri/) which is a requirement for a container runtime to work with Kubernetes. For that reason, an additional service [cri-dockerd](https://github.com/Mirantis/cri-dockerd) has to be installed. cri-dockerd is a project based on the legacy built-in Docker Engine support that was [removed](https://kubernetes.io/dockershim) from the kubelet in version 1.24.
- Tải cri-dockerd tại [releases page](https://github.com/Mirantis/cri-dockerd/releases).
- `yum install cri-dockerd-0.3.8-3.el7.x86_64.rpm`
- Khởi chạy
```bash
systemctl start cri-docker
# Created symlink from /etc/systemd/system/multi-user.target.wants/cri-docker.service to /usr/lib/systemd/system/cri-docker.service
systemctl enable cri-docker  
systemctl status cri-docker
# Created symlink from /etc/systemd/system/sockets.target.wants/cri-docker.socket to /usr/lib/systemd/system/cri-docker.socket
systemctl enable --now cri-docker.socket
```
## Cài Kubernetes
### Cấu hình container runtime
https://kubernetes.io/docs/setup/production-environment/container-runtimes/
```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# sysctl params required by setup, params persist across reboots
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# Apply sysctl params without reboot
sudo sysctl --system
```
### Cài kubeadm, kubectl, kubelet
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
- Disable swap
	- `swapoff -a`
	- `vim /etc/fstab` and comment swap line
- Disable SELinux
	```shell
	# Check status: 
	sestatus
	# Set SELinux in permissive mode (effectively disabling it)
	sudo setenforce 0
	sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
	```
- Tìm nguồn download RPM package cho kubeadm, kubectl và kubelet, không có trên https://rpmfind.net và các nguồn khác thì đều là các phiên bản cũ.
    Sử dụng script download trong bài https://medium.com/@jbn1233/download-and-offline-install-kubeadm-kubectl-kubelet-for-rpm-based-os-2ea22b07db25 trên máy Linux/WSL có kết nối mạng, sau đó upload các file rpm lên server
	```bash
	#!/bin/bash  
	  
	URLX="http://prod-cdn.packages.k8s.io/repositories/isv:/kubernetes:/core:/stable:/v$1"  
	PRIMARY=$(curl -sS $URLX/rpm/repodata/repomd.xml|grep primary.xml.gz| awk -F\" {'print $2'})  
	  
	curl -sS $URLX/rpm/$PRIMARY  | gunzip - |  grep x86_64.rpm | awk -F\" {'print $(NF-1)'} | awk -F / {'print $2'}|\  
	 sort -t '-' -k 1,1 -k 2Vr | awk -F '-' '!seen[$1]++' |\  
	 awk -v x1="$1" {'print "http://prod-cdn.packages.k8s.io/repositories/isv:/kubernetes:/core:/stable:/v"x1"/rpm/x86_64/"$1'}| \  
	 xargs -I{} curl -LO {}   
	ls -lrt
	```
	Usage:
	```
	./download.sh <Kubernetes major version number>
	```
	```
	-rw-r--r-- 1 dongnc1 dongnc1  8454340 Dec 14 14:21 cri-tools-1.28.0-150500.1.1.x86_64.rpm
	-rw-r--r-- 1 dongnc1 dongnc1 10194060 Dec 14 14:21 kubeadm-1.28.4-150500.1.1.x86_64.rpm
	-rw-r--r-- 1 dongnc1 dongnc1 10455576 Dec 14 14:21 kubectl-1.28.4-150500.1.1.x86_64.rpm
	-rw-r--r-- 1 dongnc1 dongnc1 19663204 Dec 14 14:21 kubelet-1.28.4-150500.1.1.x86_64.rpm
	-rw-r--r-- 1 dongnc1 dongnc1  6481496 Dec 14 14:21 kubernetes-cni-1.2.0-150500.2.1.x86_64.rpm
	```
- Cài:
```
# yum install ./* --disablerepo=Local_DVD
============================================================================================================================================================================================================================================
 Package                                                   Arch                                      Version                                               Repository                                                                  Size
============================================================================================================================================================================================================================================
Installing:
 cri-tools                                                 x86_64                                    1.28.0-150500.1.1                                     /cri-tools-1.28.0-150500.1.1.x86_64                                         41 M
 kubeadm                                                   x86_64                                    1.28.4-150500.1.1                                     /kubeadm-1.28.4-150500.1.1.x86_64                                           47 M
 kubectl                                                   x86_64                                    1.28.4-150500.1.1                                     /kubectl-1.28.4-150500.1.1.x86_64                                           48 M
 kubelet                                                   x86_64                                    1.28.4-150500.1.1                                     /kubelet-1.28.4-150500.1.1.x86_64                                          106 M
 kubernetes-cni                                            x86_64                                    1.2.0-150500.2.1                                      /kubernetes-cni-1.2.0-150500.2.1.x86_64                                     49 M
Installing for dependencies:
 conntrack-tools                                           x86_64                                    1.4.4-7.el7                                           http8181_CentOS7                                                           187 k
 libnetfilter_cthelper                                     x86_64                                    1.0.0-11.el7                                          http8181_CentOS7                                                            18 k
 libnetfilter_cttimeout                                    x86_64                                    1.0.0-7.el7                                           http8181_CentOS7                                                            18 k
 libnetfilter_queue                                        x86_64                                    1.0.2-2.el7_2                                         http8181_CentOS7                                                            23 k
 socat                                                     x86_64                                    1.7.3.2-2.el7                                         http8181_CentOS7                                                           290 k

Transaction Summary
============================================================================================================================================================================================================================================
Install  5 Packages (+5 Dependent packages)
```
- Enable kubelet
    ```
    sudo systemctl enable --now kubelet
    ```
- Cài kubectl auto completion
	TODO
### Creating a cluster
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
https://docs.tigera.io/calico/latest/getting-started/kubernetes/quickstart
- Chuẩn bị container image
	- https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init#without-internet-connection
	- Lấy danh sách image
		```
		# kubeadm config images list
		registry.k8s.io/kube-apiserver:v1.28.4
		registry.k8s.io/kube-controller-manager:v1.28.4
		registry.k8s.io/kube-scheduler:v1.28.4
		registry.k8s.io/kube-proxy:v1.28.4
		registry.k8s.io/pause:3.9
		registry.k8s.io/etcd:3.5.9-0
		registry.k8s.io/coredns/coredns:v1.10.1
		```
	- Pull image theo danh sách trên một máy có kết nối mạng
	- Transfer image lên server và load vào docker
- Init, cần thêm param `--cri-socket unix:///var/run/cri-dockerd.sock` vì trên node có cả socket của containerd (được cài kèm cùng docker, tại sao không dùng containerd thì không rõ)
	```
	# --apiserver-bind-port: port của API server, mặc định 6443
	# --pod-network-cidr: theo doc của Calico, không có giá trị mặc định
	kubeadm init --apiserver-bind-port 8800 --pod-network-cidr=192.168.0.0/16 --cri-socket unix:///var/run/cri-dockerd.sock

	# Nếu lỗi, chạy
	kubeadm reset --cri-socket unix:///var/run/cri-dockerd.sock
	```

	```
	To start using your cluster, you need to run the following as a regular user:
	
	  mkdir -p $HOME/.kube
	  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
	  sudo chown $(id -u):$(id -g) $HOME/.kube/config
	
	Alternatively, if you are the root user, you can run:
	
	  export KUBECONFIG=/etc/kubernetes/admin.conf
	
	You should now deploy a pod network to the cluster.
	Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
	  https://kubernetes.io/docs/concepts/cluster-administration/addons/
	
	Then you can join any number of worker nodes by running the following on each as root:
	
	kubeadm join 10.225.44.40:8800 --token 7xuucz.3wau7s7lthonu1bm \
		--discovery-token-ca-cert-hash sha256:325f3f35d94325eb8651079b7be1d40fdca7c5696d8de510d87e71ad04d663b4
	```

- Lỗi
	- Lỗi sai sandbox (pause) image
	```
	[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
	[kubelet-check] Initial timeout of 40s passed.
	
	Unfortunately, an error has occurred:
		timed out waiting for the condition
	
	This error is likely caused by:
		- The kubelet is not running
		- The kubelet is unhealthy due to a misconfiguration of the node in some way (required cgroups disabled)
	
	If you are on a systemd-powered system, you can try to troubleshoot the error with the following commands:
		- 'systemctl status kubelet'
		- 'journalctl -xeu kubelet'
	
	Additionally, a control plane component may have crashed or exited when started by the container runtime.
	To troubleshoot, list all containers using your preferred container runtimes CLI.
	Here is one example how you may list all running Kubernetes containers by using crictl:
		- 'crictl --runtime-endpoint unix:///var/run/cri-dockerd.sock ps -a | grep kube | grep -v pause'
		Once you have found the failing container, you can inspect its logs with:
		- 'crictl --runtime-endpoint unix:///var/run/cri-dockerd.sock logs CONTAINERID'
	error execution phase wait-control-plane: couldn't initialize a Kubernetes cluster
	To see the stack trace of this error execute with --v=5 or higher
	```
	Kiểm tra kubelet vẫn đang chạy nhưng có lỗi
	```
	RunPodSandbox from runtime service failed" err="rpc error: code = Unknown desc = failed pulling image \"registry.k8s.io/pause:3.6\": Error response from daemon: Get \"https://registry.k8s.io/v2/\": dial tcp: lookup registry.k8s.io on [::1]:53: read udp [::1]:58968->[::1]:53: read: connection refused
	```
	Trong khi image thực tế là 3.9. Sửa file `/usr/lib/systemd/system/cri-docker.service`, thêm `--pod-infra-container-image=registry.k8s.io/pause:3.9` vào dòng `ExecStart=` sau đó reload và restart cri-docker ([ref](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#override-pause-image-cri-dockerd-mcr))
	```
	vim /usr/lib/systemd/system/cri-docker.service
	# reload changed cri-docker.service file
	systemctl daemon-reload
	# restart service
	systemctl restart cri-docker
	# check status để thấy được tham số mới thêm đã được thực thi
	systemctl status cri-docker
	```
    Reset và init lại cluster
### Config kubectl
```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
### Network plugin
> You must deploy a Container Network Interface (CNI) based Pod network add-on so that your Pods can communicate with each other. Cluster DNS (CoreDNS) will not start up before a network is installed.
> [Installing a Pod network add-on](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#pod-network)

Khi này các pod `coredns` vẫn chưa ready và node cũng NotReady, cần cài đặt thêm network plugin
https://docs.tigera.io/calico/latest/getting-started/kubernetes/quickstart
https://docs.tigera.io/calico/latest/getting-started/kubernetes/self-managed-onprem/onpremises
- Cài đặt theo Operator
- Tải các file manifest về:
	```
	kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.4/manifests/tigera-operator.yaml
	curl https://raw.githubusercontent.com/projectcalico/calico/v3.26.4/manifests/custom-resources.yaml -O
	kubectl create -f custom-resources.yaml
	```
- Không tìm được danh sách image cần pull trước ngoài image của operator, deploy lên, thiếu image nào thì pull image đó
	```
	quay.io/tigera/operator:v1.30.9
	docker.io/calico/pod2daemon-flexvol:v3.26.4
	docker.io/calico/cni:v3.26.4
	docker.io/calico/node:v3.26.4
	docker.io/calico/typha:v3.26.4
	docker.io/calico/csi:v3.26.4
	docker.io/calico/node-driver-registrar:v3.26.4
	docker.io/calico/kube-controllers:v3.26.4
	docker.io/calico/apiserver:v3.26.4
	```
- Sau khi cài đặt xong, các pod `coredns` và node đã ready
	```
	[vtb_ml@vtb-bi-37 calico_v3.26.4]$ k get pod -A
	NAMESPACE          NAME                                       READY   STATUS    RESTARTS        AGE
	calico-apiserver   calico-apiserver-5d69dcb64f-6x72p          1/1     Running   0               17m
	calico-apiserver   calico-apiserver-5d69dcb64f-jth82          1/1     Running   0               17m
	calico-system      calico-kube-controllers-6bd7dffdb7-h6tqs   1/1     Running   0               2d16h
	calico-system      calico-node-sggt7                          1/1     Running   0               2d16h
	calico-system      calico-typha-5f554dd596-xxcrv              1/1     Running   0               2d16h
	calico-system      csi-node-driver-8msvn                      2/2     Running   0               2d16h
	kube-system        coredns-5dd5756b68-bx9rv                   1/1     Running   0               2d18h
	kube-system        coredns-5dd5756b68-pzstv                   1/1     Running   0               2d18h
	kube-system        etcd-vtb-bi-37                             1/1     Running   0               2d18h
	kube-system        kube-apiserver-vtb-bi-37                   1/1     Running   0               2d18h
	kube-system        kube-controller-manager-vtb-bi-37          1/1     Running   0               2d18h
	kube-system        kube-proxy-cvx6x                           1/1     Running   0               2d18h
	kube-system        kube-scheduler-vtb-bi-37                   1/1     Running   0               2d18h
	tigera-operator    tigera-operator-7f8cd97876-xhrnk           1/1     Running   1 (2d16h ago)   2d16h
	```
## Join node
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#join-nodes
https://thenewstack.io/how-many-nodes-for-your-kubernetes-control-plane/
- [[Kubernestes Installation#Cài Container runtime - docker]]
- [[Kubernestes Installation#Cài kubeadm, kubectl, kubelet]]
- Load các image của Calico như trong [[Kubernestes Installation#Network plugin]] (calico_node-driver-registrar, calico_cni, calico_node, calico_csi, calico_pod2daemon-flexvol)
	```
	docker.io/calico/pod2daemon-flexvol:v3.26.4
	docker.io/calico/cni:v3.26.4
	docker.io/calico/node:v3.26.4
	docker.io/calico/typha:v3.26.4
	docker.io/calico/csi:v3.26.4
	docker.io/calico/node-driver-registrar:v3.26.4
	```
- Để cài [HA cho control plane](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/), cần có load balancer đứng trước các control plane nodes, có thể sử dụng LB cứng hoặc LB mềm ([Options for Software Load Balancing](https://git.k8s.io/kubeadm/docs/ha-considerations.md#options-for-software-load-balancing) sử dụng keepalived và haproxy). Nhưng việc này là không bắt buộc, nếu không có load balancer thì các component trong cụm vẫn hoạt động bình thường vì kết nối đến API server thông qua DNS thay vì IP. Chỉ vướng ở phần client kết nối thì phải chọn 1 trong 3 IP và không có tự động đổi nếu 1 node chết -> cài 3 node giống nhau, mỗi node có control plane, etcd, worker (tham khảo Google Bard)
	- Trước khi join thêm một control-plane node cần phải cấu hình `controlPlaneEndpoint` như dưới, nhưng việc này (theo Bard) không làm ảnh hưởng đến việc tự động loadbalance trong nội bộ cụm
- Create token nếu token trong kết quả của `kubeadm init` trên node đầu tiên hết hạn (mặc định 24h)
	```
	kubeadm token create
	```
- upload cert nếu chưa làm, sau 2 tiếng sẽ hết hạn và phải làm lại
	```
	kubeadm init phase upload-certs --upload-certs
	
	[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
	[upload-certs] Using certificate key:
	527a22fa6c5d5222795cf0097a4f3868b154391cb770296e0ef72af2422c4909
	```
- gen cert mới nếu chưa thực hiện lấy cert ở bước trên
	```
	kubeadm certs certificate-key
	```
- Join as control plane trên node mới
	```
	kubeadm join 10.225.44.40:8800 --control-plane --apiserver-bind-port 8800 --token j2axgr.zzedc2zjon1k38f4 --discovery-token-ca-cert-hash sha256:325f3f35d94325eb8651079b7be1d40fdca7c5696d8de510d87e71ad04d663b4 --cri-socket unix:///var/run/cri-dockerd.sock --certificate-key 527a22fa6c5d5222795cf0097a4f3868b154391cb770296e0ef72af2422c4909
	```

- Lỗi 
```
One or more conditions for hosting a new control plane instance is not satisfied.

unable to add a new control plane instance to a cluster that doesn't have a stable controlPlaneEndpoint address

Please ensure that:
* The cluster has a stable controlPlaneEndpoint address.
* The certificates that must be shared among control plane instances are provided.
```
Cần 
- upload cert, thêm `--certificate-key` vào join
- cấu hình `controlPlaneEndpoint` với giá trị là IP:port của control plane node (đúng ra phải là của load balancer) (https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-reconfigure/) https://stackoverflow.com/questions/57845534/why-is-kubeadm-configs-controlplaneendpoint-necessary trên control plane node
```
kubectl edit cm -n kube-system kubeadm-config
```

```YAML
apiVersion: v1
data:
  ClusterConfiguration: |
    apiServer:
      extraArgs:
        authorization-mode: Node,RBAC
      timeoutForControlPlane: 4m0s
    apiVersion: kubeadm.k8s.io/v1beta3
    certificatesDir: /etc/kubernetes/pki
    clusterName: kubernetes
    controlPlaneEndpoint: "10.225.44.40:8800"
	...
```
Join 
```
[root@vtb-bi-38 image]# kubeadm join 10.225.44.40:8800 --control-plane --apiserver-bind-port 8800 --token j2axgr.zzedc2zjon1k38f4 --discovery-token-ca-cert-hash sha256:325f3f35d94325eb8651079b7be1d40fdca7c5696d8de510d87e71ad04d663b4 --cri-socket unix:///var/run/cri-dockerd.sock --certificate-key 527a22fa6c5d5222795cf0097a4f3868b154391cb770296e0ef72af2422c4909
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[preflight] Running pre-flight checks before initializing the new control plane instance
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[download-certs] Downloading the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[download-certs] Saving the certificates to the folder: "/etc/kubernetes/pki"
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost vtb-bi-38] and IPs [10.225.44.41 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost vtb-bi-38] and IPs [10.225.44.41 127.0.0.1 ::1]
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local vtb-bi-38] and IPs [10.96.0.1 10.225.44.41 10.225.44.40]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Valid certificates and keys now exist in "/etc/kubernetes/pki"
[certs] Using the existing "sa" key
[kubeconfig] Generating kubeconfig files
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[check-etcd] Checking that the etcd cluster is healthy
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...
[etcd] Announced new etcd member joining to the existing etcd cluster
[etcd] Creating static Pod manifest for "etcd"
[etcd] Waiting for the new etcd member to join the cluster. This can take up to 40s
The 'update-status' phase is deprecated and will be removed in a future release. Currently it performs no operation
[mark-control-plane] Marking the node vtb-bi-38 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node vtb-bi-38 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]

This node has joined the cluster and a new control plane instance was created:

* Certificate signing request was sent to apiserver and approval was received.
* The Kubelet was informed of the new secure connection details.
* Control plane label and taint were applied to the new node.
* The Kubernetes control plane instances scaled up.
* A new etcd member was added to the local/stacked etcd cluster.

To start administering your cluster from this node, you need to run the following as a regular user:

	mkdir -p $HOME/.kube
	sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
	sudo chown $(id -u):$(id -g) $HOME/.kube/config

Run 'kubectl get nodes' to see this node join the cluster.
```
- Calico sẽ tự động tạo các pod `calico-node` và `csi-node-driver` trên node mới, nếu không có Operator thì không biết có tự động không
## Untaint node
By default, your cluster will not schedule Pods on the control plane nodes for security reasons. If you want to be able to schedule Pods on the control plane nodes, for example for a single machine Kubernetes cluster, run:
```bash
kubectl taint nodes --all node-role.kubernetes.io/control-plane
```
# Kubernetes 1.31.0 - Docker 24.0.6 - Centos 7 - VTZ
## Cotainer runtime
Trên server đã có sẵn containerd 1.6.22, docker 24.0.6
### Cài cri-dockerd
Phải tải version [v0.3.14](https://github.com/Mirantis/cri-dockerd/releases/tag/v0.3.14) vì các version cao hơn đã không còn hỗ trợ Centos: `cri-dockerd-0.3.14-3.el7.x86_64`
## Cài Kubernetes
### Cấu hình container runtime
Như trên
### Cài kubeadm, kubectl, kubelet
- Server đã được disable swap, disable SELinux sẵn và có một số yum repo
- Tải file cài đặt Kubernetes:
    ```
    dongnc@NCD-GS63:~/kubernetes$ ./download-rpm.sh 1.31
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100 7069k  100 7069k    0     0  1929k      0  0:00:03  0:00:03 --:--:-- 1929k
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100 10.9M  100 10.9M    0     0  2996k      0  0:00:03  0:00:03 --:--:-- 2995k
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100 10.7M  100 10.7M    0     0  3234k      0  0:00:03  0:00:03 --:--:-- 3234k
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100 14.6M  100 14.6M    0     0  4184k      0  0:00:03  0:00:03 --:--:-- 4186k
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100 7248k  100 7248k    0     0  2366k      0  0:00:03  0:00:03 --:--:-- 2367k
    total 51600
    -rwxr-xr-x 1 dongnc dongnc      525 Aug 28 00:13 download-rpm.sh
    -rw-r--r-- 1 dongnc dongnc  7239168 Aug 28 00:16 cri-tools-1.31.1-150500.1.1.x86_64.rpm
    -rw-r--r-- 1 dongnc dongnc 11505440 Aug 28 00:16 kubeadm-1.31.0-150500.1.1.x86_64.rpm
    -rw-r--r-- 1 dongnc dongnc 11316980 Aug 28 00:16 kubectl-1.31.0-150500.1.1.x86_64.rpm
    -rw-r--r-- 1 dongnc dongnc 15341520 Aug 28 00:16 kubelet-1.31.0-150500.1.1.x86_64.rpm
    -rw-r--r-- 1 dongnc dongnc  7422660 Aug 28 00:16 kubernetes-cni-1.5.0-150500.2.1.x86_64.rpm
    ```
- Cài:
    ```
    # yum install ./*
    ==================================================================================================================================================================
     Package                                Arch                   Version                              Repository                                               Size
    ==================================================================================================================================================================
    Installing:
     cri-tools                              x86_64                 1.31.1-150500.1.1                    /cri-tools-1.31.1-150500.1.1.x86_64                      29 M
     kubeadm                                x86_64                 1.31.0-150500.1.1                    /kubeadm-1.31.0-150500.1.1.x86_64                        56 M
     kubectl                                x86_64                 1.31.0-150500.1.1                    /kubectl-1.31.0-150500.1.1.x86_64                        54 M
     kubelet                                x86_64                 1.31.0-150500.1.1                    /kubelet-1.31.0-150500.1.1.x86_64                        73 M
     kubernetes-cni                         x86_64                 1.5.0-150500.2.1                     /kubernetes-cni-1.5.0-150500.2.1.x86_64                  57 M
    Installing for dependencies:
     conntrack-tools                        x86_64                 1.4.4-7.el7                          base                                                    187 k
     libnetfilter_cthelper                  x86_64                 1.0.0-11.el7                         base                                                     18 k
     libnetfilter_cttimeout                 x86_64                 1.0.0-7.el7                          base                                                     18 k
     libnetfilter_queue                     x86_64                 1.0.2-2.el7_2                        base                                                     23 k
     socat                                  x86_64                 1.7.3.2-2.el7                        base                                                    290 k
    
    Transaction Summary
    ==================================================================================================================================================================
    Install  5 Packages (+5 Dependent packages)
    ```
-  Enable kubelet
    ```
    sudo systemctl enable --now kubelet
    ```
### Creating a cluster
- Lấy danh sách image `kubeadm config images list` lỗi:
    ```
    [root@LMS_APP_01_10101044031 rpm]# kubeadm config images list
    W0827 20:37:42.313336   51428 version.go:109] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get "https://dl.k8s.io/release/stable-1.txt": dial tcp: lookup dl.k8s.io on 10.101.44.1:53: write udp 10.101.44.31:32491->10.101.44.1:53: write: operation not permitted
    W0827 20:37:42.313381   51428 version.go:110] falling back to the local client version: v1.31.0
    could not convert cfg to an internal cfg: nodeRegistration.name: Invalid value: "lms_app_01_10101044031": a lowercase RFC 1123 subdomain must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')
    To see the stack trace of this error execute with --v=5 or higher
    ```
    Nguyên nhân là do hostname hiện tại `LMS_APP_01_10101044031` đang không đúng tiêu chuẩn. Đổi lại:
    ```
    hostnamectl set-hostname lms-app-01-10101044031
    ```
    Danh sách image:
    ```
    registry.k8s.io/kube-apiserver:v1.31.0
    registry.k8s.io/kube-controller-manager:v1.31.0
    registry.k8s.io/kube-scheduler:v1.31.0
    registry.k8s.io/kube-proxy:v1.31.0
    registry.k8s.io/coredns/coredns:v1.11.1
    registry.k8s.io/pause:3.10
    registry.k8s.io/etcd:3.5.15-0
    ```
- Init
    ```
    kubeadm init --apiserver-bind-port 8000 --pod-network-cidr=192.168.0.0/16 --cri-socke:t unix:///var/run/cri-dockerd.sock
    ```
- Lỗi sandbox image tương tự như VTB, fix, sau đó reset và init lại
### Network plugin
- Lỗi pod `tigera-operator`: `Get "https://10.96.0.1:443/api?timeout=32s": dial tcp 10.96.0.1:443: i/o timeout`.  Dải IP `10.96.0.0/12` được cấu hình trong file `/etc/kubernetes/manifests/kube-apiserver.yaml`:
    ```
    --service-cluster-ip-range=10.96.0.0/12
    ```
    Có thể có nhiều nguyên nhân ("This is likely related to network interface configurations, kubeadm configuration (regarding ip addresses), and lastly firewall configurations."), thêm rule dưới vào iptables thì OK.
    ```
    -A OUTPUT -d 10.96.0.0/12 -m comment --comment "Kubernetes service cluster ip" -j ACCEPT
    ```
- Sau khi pod `tigera-operator` chạy được thì pod `calico-apiserver` được khởi tạo nhưng lỗi `Liveness probe failed: Get "https://192.168.35.70:5443/version": context deadline exceeded`. Dải IP `192.168.0.0/16` được cấu hình khi init cluster, và có thể xem lại trong file `/etc/kubernetes/manifests/kube-controller-manager.yaml`. 
    ```
    --cluster-cidr=192.168.0.0/16
    ```
    Thêm rule dưới vào iptables:
    ```
    -A OUTPUT -d 192.168.0.0/16 -m comment --comment "Kubernetes cluster cidr" -j ACCEPT
    ```
- CoreDNS lỗi `HINFO: read udp 192.168.35.66:54245->10.101.44.1:53: i/o timeout`, nhưng được fix sau khi fix lỗi pod `tigera-operator` trên (không rõ tại sao)
## Join node
```
-A INPUT -s 10.101.44.31/24 -m comment --comment "Kubernetes cluster nodes" -j ACCEPT
...
-A OUTPUT -d 10.101.44.31/24 -m comment --comment "Kubernetes cluster nodes" -j ACCEPT
-A OUTPUT -d 192.168.0.0/16 -m comment --comment "Kubernetes cluster cidr" -j ACCEPT
-A OUTPUT -d 10.96.0.0/12 -m comment --comment "Kubernetes service cluster ip" -j ACCEPT
```
