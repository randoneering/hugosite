---
title: Basic MariaDB Install Playbook
type: page
description: When you just want a simple install of MariaDB via Ansible
topic: Ansible
---

# Getting Down to the Basics

This will be an ongoing task and is in a private repo currently. However, I wanted to share the core of the playbook here. Check back periodically where I will make adjustments to include other best practices. Once I feel like this is in a solid state, I will open up the github repo for easy of use. 

## Before You Copy Pasta

Notice the variables-you will need to add your own vars file, inventory file, and your ansible.cfg file. This is not complete, but works in its current state. Feel free to use at your own discretion.



```yml

- hosts: all
  become: true
  vars_files:
    - external vars file location  #add your own var location


  tasks:
  
  - name: update repository index
    apt:
      update_cache: yes
      
  - name: install mariadb and related plugins
    apt:
      name: mariadb-server
      
  - name: create /data/database directory and mount
    file:
      path: /data/database
      state: directory
      owner: mysql

  - name: Adds Python3
    apt: pkg="python3" state=present
    when: ansible_os_family =='Debian'

  - name: Adds Python2
    apt: pkg="python2" state=present
    when: ansible_os_family =='Debian'

  - name: Install Python3-mysqldb
    apt: pkg="python3-mysqldb" state=present
    when: ansible_os_family =='Debian'

  - name: Change root user password on first run
    mysql_user: login_user=root
                login_password="{{ mysql_root_password }}"
                check_implicit_admin=yes
                name=root
                password={{ mysql_root_password }}
                priv=*.*:ALL,GRANT
                host="localhost"

  - name: delete anonymous MySQL server user
    mysql_user: login_user=root
                login_password='{{ mysql_root_password }}'
                check_implicit_admin=yes
                user=""
                host="localhost"
                state="absent"

  - name: remove the MySQL test database
    action: mysql_db login_user=root login_password="{{ mysql_root_password }}" db=test state=absent

  - name: Secures the MySQL root user for IPV6 localhost (::1)
    mysql_user: login_user=root
                login_password='{{ mysql_root_password }}'
                check_implicit_admin=yes
                user=root
                host="::1"
    no_log: yes

  - name: Secures the MySQL root user for IPV4 localhost (127.0.0.1)
    mysql_user: login_user=root
                login_password='{{ mysql_root_password }}'
                check_implicit_admin=yes
                user=root
                host="127.0.0.1"
    no_log: yes

  - name: Secures the MySQL root user for localhost domain (localhost)
    mysql_user: login_user=root
                login_password='{{ mysql_root_password }}'
                check_implicit_admin=yes
                user=root
                host="localhost"
    no_log: yes

  - name: Secures the MySQL root user for server_hostname domain
    mysql_user: login_user=root
                login_password='{{ mysql_root_password }}'
                check_implicit_admin=yes
                user=root
                host="{{ server_fqdn }}"
    no_log: yes

  - name: Create /var/log/mariadb directory
    file:
      path: /var/log/mariadb
      state: directory
      owner: mysql

  - name: Stop mariadb service
    ansible.builtin.service: 
      name: mariadb
      state: stopped

  - name: Copy var/lib/mysql to /data/database
    ansible.builtin.copy: 
      remote_src: yes
      src: /var/lib/mysql/
      dest: /data/database/
      owner: mysql
      group: mysql

  - name: Copy preconfigured config file for mariadb
    ansible.builtin.copy:
      src: location for template conf file
      dest: /etc/mysql/mariadb.conf.d
      owner: root
      group: root
  
  - name: Start mariadb service
    ansible.builtin.service:
      name: mariadb
      state: started

```