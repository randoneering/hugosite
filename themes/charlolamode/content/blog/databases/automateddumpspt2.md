---
title: Automate your dumps with Powershell(part 2)
type: page
description: Using Powershell to automate adhoc or scheduled database dumps for MySQL in next post
topic: Database Administration
publishDate: 2023-10-29
---

# Time for mysqldump

The script is identical other than two things. First, we have to use a separate secrets file to the user and password to execute mysqldump. Secondly, the parameter order is different for mysqldump, and it is very picky. I have included some source post and documentation that helped me get around a few issues. 


## Storing the password 

Like Postgres, I wanted to store the password somewhere so I wouldn't need to manually enter for each dump (and avoid plain text exposure of my password when passing the command). This can be done by following the instructions here https://stackoverflow.com/questions/9293042/how-to-perform-a-mysqldump-without-a-password-prompt .
This post, referencing official mysql documentation, states to do the following in /.my.cnf file. 

```bash
[mysqldump]
user=mysqluser
password=secret
```

Be sure to set the correct permissions to the file (CHMOD 600 for unix), but Windows should do the same thing as your pgpass file and assume it is secure. 


## mysqldump parameters

```sql
.\mysqldump.exe --defaults-file=$mysqlpassword -u $user -h $server.hostname -B $database --set-gtid-purged=OFF --result-file=$dumpfile
```

You will need to pass your '--defaults-file=' parameter first, as this should always be the first parameter passed if you are using it. 

https://stackoverflow.com/questions/3836214/problem-with-mysqldump-defaults-extra-file-option-is-not-working-as-expecte

Additionally, unless you are planning on using this dump for a replica instance (from a primary instance), I strongly suggest using '--set-gtid-purged=off'.

https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html#option_mysqldump_set-gtid-purged

Your last parameter is the '--result-file='. Yes, same situation here, where you cannot simply use '>'. 

# The script

That covers a quick two part post. Find the script below, or on my github

https://github.com/randoneering/adhoc_mysqldumps

```powershell
<#

Background info on issues with parameters I ran into

Official MySQL documentation on mysqldump: https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html

Why --defaults-extra-file option needs to be first: https://stackoverflow.com/questions/3836214/problem-with-mysqldump-defaults-extra-file-option-is-not-working-as-expecte

Avoid gtid errors when restoring to another database: https://superuser.com/questions/906843/import-mysql-data-failed-with-error-1839

Description:
The following script runs mysqldump with necessary parameters to generate a dump, gzip the file, and upload to an s3 bucket.
#>

#Credentials for backup user

$user = "svc_backup"

$mysqlpassword = "path\to\.my.cnf"



# Setup alias for 7zip for easy gziping

$7zipPath = "$env:ProgramFiles\7-Zip\7z.exe"

Set-Alias Compress-7Zip $7ZipPath



#Location of mysqldump and backup destination

$mysqldumpLocation = "\path\to\mysqldump.exe"

$backupDest = "path\to\dumps\$($database)"



#Use for testing script

$serverlist = @(

@{

hostname = ""

databases = @(

""

)

}

)


#Script to run mysqldump and gzip for each database instance(and db) that are mentioned in the Array(s) above)

foreach ($server in $serverlist) {

foreach ($database in $server.databases){

#write logging, in case we automate this in some task scheduler

Start-Transcript "path\to\logs\mysqldump\env\$("env"+$date+$server.hostname).log" -Append

Write-Host "Running backup for $database"

#Set dump location

$dumpfile = "path\to\dumps\$($database).sql"



#Check if file is already there, if so delete.

if(Test-Path $dumpfile){

Remove-Item $dumpfile

Write-Host "$dumpfile removed"

}else{

Write-Host "$dumpfile does not exist. Proceeding"

}

#Execute pg_dump with parameters

.\mysqldump.exe --defaults-file=$mysqlpassword -u $user -h $server.hostname -B $database --set-gtid-purged=OFF --result-file=$dumpfile


#Variables for 7zip

$Source = $dumpfile

#Check if file is already there, if so delete

$Destination = "path\to\gzip\$($database).gz"

if(Test-Path $Destination){

Remove-Item $Destination

Write-Host "$Destination removed"

}else{

Write-Host "$Destination does not exist. Proceeding"

}

#Compress to gzip at highest compression

Compress-7zip a -mx=5 $Destination $Source


Stop-Transcript

}

}

#Upload to s3 bucket

aws s3 cp \path\to\dumps s3://s3bucket --recursive

```