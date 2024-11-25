---
title: Automate your dumps with Powershell(part 1)
type: page
description: Using Powershell to automate adhoc or scheduled database dumps for Postgres(MySQL in next post)
topic: Database Administration
date: 2023-10-27
---

# The Ask

I was asked to do the following. First, I needed to run a backup of specific databases, both in Postgres and MySQL. Second, I needed to gzip the backup. Finally, it had to be uploaded to an S3 bucket. Seemed straight forward enough. 

# The How

In a previous life, I worked in a Sysadmin/DBA hybrid role where I wrote a lot of powershell scripts for support. I would prefer to use this opportunity to learn python (which is in the works now), but I needed to get this done in a time frame that would not allow for me to learn it. So, I went to powershell. 

Since I was dealing with MySQL and Postgres, I would need to use pg_dump (Postgres) and mysqldump (MySQL) seemed like the likely candidates for the database dumps. Compression could be done by 7zip. Then there is uploading to S3, which is just something I would write using aws cli. Seemed straightforward enough.

# I was wrong

My first problem was finding a way to pass a database hostname through and for each of those hostnames, go down the line of databases that needed to be backed up. I reached out to a friend after trying many forms of arrays that simply did not work. He suggested the following:

```powershell
$serverlistENV = @(
    @{
        hostname = "database.hostname.tech"
        databases = @(
            "database1"
        )
    },
    @{
        hostname = "database2.hostname.tech"
        databases = @(
            "database2"
        )
    }
        )
    
```

Now that I have my desired variable in place for my server names and database names, I went to work on the actual foreach loop that would do the work.


```powershell

#Password for your user
$env:PGPASSFILE = 'path\to\pgpass.conf'
$pguser = 'svc_backup'

#Setup alias for 7zip for easy gziping

$7zipPath = "$env:ProgramFiles\7-Zip\7z.exe"
Set-Alias Compress-7Zip $7ZipPath

#Change working directory where pg_dump

cd "path\to\pg_dump.exe"

#Foreach loop
foreach ($server in $serverlistENV){
    foreach ($database in $server.databases){

#write logging, in the case you want to automate in a schedule 

Start-Transcript "path\to\logs\$("env"+$date+$server.hostname).log" -Append

Write-Host "Running backup for $database"

#Set dump location to X drive
$dumpfile = "path\to\backup\$($database).dump"

#Check if file is already there, if so delete.
if(Test-Path $dumpfile){

Remove-Item $dumpfile

Write-Host "$dumpfile removed"

}else{

Write-Host "$dumpfile does not exist. Proceeding"

}

#Execute pg_dump with parameters
.\pg_dumpall.exe -h $server.hostname -U $pguser -f $dumpfile --no-role-passwords --exclude-database="rdsadmin" --exclude-database="postgres" --database=$database

    }
}

```


## Hold up, some variables!
If you are paying attention, you might have noticed a few variables. 

'$env:PGPASSFILE' in particular. I wanted the ability to pass credentials, relatively securely, and not in plain text. This was the best option, locally storing a password file. Otherwise, your script will hang until a password is passed through. More details on setting this up can be found here in the official Postgres documentation

https://www.postgresql.org/docs/current/libpq-pgpass.html

For Windows, where ever you store the file, it will be assumed it is "secured" an passing in the environmental variable should work seamlessly. For unix systems, pay attention to the CHMOD hint in the documentation.

The rest I will include in the full script, which will be available on my github. Additionally, the script will be available at the end of this post. 

https://github.com/randoneering/adhoc_pgdumps

# Back to the script

You might have ALSO noticed I used pg_dumpall instead of pg_dump. Interesting right? Turns out I needed to grab roles (without passwords) for my task, and pg_dump only dumps a single database, and not the global users. 

'--no-role-passwords' does what it looks like; dumps the roles but nulls the password. You will then need to go in and reset the passwords for these roles after restoring. Then there is the '--exclude-database' parameters, excluding the rdsadmin database and postgres default database. We did not want those as well. 

If you wanted to just dump one single database, then you can use the following command for that:

```bash
.\pg_dump.exe -h $server.hostname -u $pguser -F c -f $dumpfile $database
```

Here, '-F' for the dump format and then 'c' for custom, which eventually would just be .dump for the future user of 'pg_restore'. As for the file output location, '-f' is used. Interestingly enough, I found a weird artifact using the > operator when I originally wrote the pg_dump command in powershell. I ended up getting dumps that had a weird utf encoded header garbage that caused pg_restore to fail. Scratching my head, I went around looking for the cause. I found someone hit the same problem and it was due to the use of the > operator inside the powershell script. Details here:

https://dba.stackexchange.com/questions/44019/pg-dump-9-2-x-command-does-not-work-with-pg-dump-9-2-3


# Finishing the script

```powershell
#Variables for 7Zip
$Source = $dumpfile

#Check if file is already there, if so delete
$Destination = "path\to\databasefile\$($database).gz"

if(Test-Path $Destination){

Remove-Item $Destination

Write-Host "$Destination removed"

}else{

Write-Host "$Destination does not exist. Proceeding"

}

#Compress to gzip at highest compression

Compress-7zip a -mx=5 $Destination $Source

Stop-Transcript

```

I highly recommend, if your backups are larger than a few GB, to AVOID putting a compression higher than 5. It will take, a long time, depending on your resources (on the device you are executing this script on).

Last step-time to upload to s3

```powershell
aws s3 cp path\to\gzips\ s3:\\yourbuckethere --recursive 
```

For the full script, feel free to use the github repo here. Free to use at your own discretion. Or copy-pasta from below (and change to your liking).



```powershell
<#

Summary: The following script runs pg_dump, gzips the dump, and then uploads to an s3 bucket.

Initially I used the > operator to pipe dump to file. This caused some issues with encoding. Therefore,

I used -f (file location) parameter instead.

https://dba.stackexchange.com/questions/44019/pg-dump-9-2-x-command-does-not-work-with-pg-dump-9-2-3

#>

#Password for svc_backup is in pgpass
$env:PGPASSFILE ='path\to\pgpass.conf'
$pguser = 'svc_backup'

# Setup alias for 7zip for easy gziping

$7zipPath = "$env:ProgramFiles\7-Zip\7z.exe"

Set-Alias Compress-7Zip $7ZipPath

# Find details here regarding 7zip alias work https://www.delftstack.com/howto/powershell/powershell-7zip/

# Change working directory to where pg_dump is located

cd "path\to\pgdump.exe"

#Array for Database Servers and Databases
$serverlist= @(
@{
hostname = ""
databases = @(
""
)

}

)

#The actual work is done here

foreach ($server in $serverlist) {

foreach ($database in $server.databases){

#write logging, in case we automate this in some task scheduler

Start-Transcript "path\to\logs\$("env"+$date+$server.hostname).log" -Append

Write-Host "Running backup for $database"

#Set dump location to X drive

$dumpfile = "path\to\dumps\$($database).dump"




#Check if file is already there, if so delete.

if(Test-Path $dumpfile){

Remove-Item $dumpfile

Write-Host "$dumpfile removed"

}else{

Write-Host "$dumpfile does not exist. Proceeding"

}

#Execute pg_dump with parameters

##.\pg_dump.exe -h $server.hostname -U $pguser -F c -f $dumpfile $database

.\pg_dumpall.exe -h $server.hostname -U $pguser -f $dumpfile --no-role-passwords --exclude-database="rdsadmin" --exclude-database="postgres" --database=$database

#Variables for 7zip

$Source = $dumpfile



#Check if file is already there, if so delete

$Destination = "path\to\gzips\$($database).gz"

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
aws s3 cp path\to\gzips\ s3://yourbuckethere--recursive

```

# Part 2 mysqldump!

I will post the mysqldump version in a future post. Hope this helps someone out there! 