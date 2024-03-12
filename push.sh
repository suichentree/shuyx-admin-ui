# 该脚本主要用于同时提交代码到gitee和github上。
# gitee的远程仓库是 https://gitee.com/suichentree/shuyx-admin-ui.git  main分支
# github的远程仓库是 https://github.com/suichentree/shuyx-admin-ui.git main分支

# 注意1: 在git终端中运行脚本。运行脚本命令：bash push.sh
# 注意2：可用检查当前git远程仓库是否是目标仓库

# 定义commit方法
function commit() {
    #定义变量commitMessage,并接受外部输入赋值
    read -p "输入commitMessage: " commitMessage 
    echo "commitMessage is  $commitMessage"
    #将暂存区的文件提交到本地分支中
    git commit -m $commitMessage
}

# 定义push方法
function push(){
    # 本地分支推送文件到远程仓库origin的main分支。 origin分支的是gitee的远程仓库
    git push origin main
    # 本地分支推送文件到远程仓库github-origin的main分支。github-origin分支的是github的远程仓库
    git push github-origin main
    # $?可以获取git push 命令是否运行成功，成功返回0，否则非0。
    if [ $? -eq 0 ] 
    then
        # 上传成功，方法结束
        echo "SUCCESS , git push success"
    else     
        # 上传失败，重新执行上传命令
        echo "ERROR , git push fail"
        # 延迟5秒
        sleep 5s
        # 重新执行push方法
        echo "Push Code to Remote Repository Again -------------------"
        push
    fi
}


# 脚本从这里开始--------------
echo "Start Run push.sh -------------------"

# 将所有变动文件添加到暂存区
git add -A

# 检查是否有文件需要提交
check_commit=`git status`
if [[ $check_commit =~ "Changes to be committed:" ]] 
then 
    # 还有文件要提交
    echo "YES,some file need commit."
    # 执行提交方法
    commit
else     
    # 没有文件需要提交
    echo "NO, no file need commit"
fi

# 执行push方法
push

# 脚本从这里结束--------------
echo "push.sh run finish -------------------"