# 遇到的问题

这个 MD 文件编写的比较晚了，之前遇到的很多问题都没有记录下来，开发过程中遇到的问题
基本都是靠脑子记住，或者是记在电脑上的某个文件当中，用 MD 记录，还有通过发布文章的
的方式让其他人知道，问题记录比较分散。

下面开始将记录迄今为止已记录的所有问题，将会以文字描述或者是文章链接的形式给出。

## 1. 前端图片 200，但返回的是 html 代码

这个原因是之前是使用 tomcat 作为静态静态资源服务器，同时又用其处理后端的接口请求，之前
部署上线时并没有这个问题，但这次部署上线时出现了一次 404，刚开始时是因为后端报错了，服务器
虽然启动完成，但其中的服务并没有启动导致的。

后来又出现了一次 404，然后排查问题，发现是 nginx 的配置出现了问题，之前的代码如下：

```
location ^~ /huadiao/ {
    proxy_pass http://114.55.41.107:8080/;    # 8080是后端端口
}
```

看起来没有什么问题，而且之前也部署成功了两次，甚至连续运行了半年多，然后这次开发了新的功能想
上线，就冒出了这些个问题，很让我疑惑，怎么会有这个 nginx 的问题，还有 tomcat 静态资源
200 但返回 html 的问题。然后我尝试去解决。

```
location ^~ /huadiao/ {
    proxy_pass http://114.55.41.107:8080;    # 8080是后端端口
}
```

通过 GPT 得知，需要把后面的斜杆给去掉。最后验证确实如此，但这样我就更加困惑了，我还运行了
好几个月，如果说是这个问题的话，那为什么之前能运行成功呢？这个我并没有找到答案。

然后一个问题就是后端资源访问 200 但返回 html 的问题，这个我笨想着去解决，思考了一下，
发现好像 nginx 就可以作为图片管理器，还能减轻后端服务器的压力，所以就进行了下面的配置，

```
location ^~ /images/ {
    alias /huadiao/images/;    # 注意这里要加斜杆
}
```

对了，上面的末尾的斜杆加与不加是有区别的，比较繁琐，我暂时没有搞懂。

最后总算是搞定了，应该来说是提高网站的响应速度。因为减轻了后端服务器压力。
