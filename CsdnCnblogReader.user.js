// ==UserScript==
// @name         CSDN,CNBLOG博客阅读模式切换插件 
// @version      2.70
// @description  CSDN 阅读模式和浏览模式切换，完美支持傲游、360、Chrome等浏览器
// @author       By Jackie http://csdn.admans.cn/
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://www.cnblogs.com/*/p/*.html
// @match        *://www.cnblogs.com/*/articles/*.html
// @match        *://www.cnblogs.com/*/archive/*/*/*/*.html
// @match        *://*.admans.net/
// @match        *://*.admans.cn/
// @grant    GM_addStyle
// @namespace https://greasyfork.org/users/164689
// @supportURL   https://github.com/JackieZheng/CsdnCnblogReader/issues
// ==/UserScript==

GM_addStyle("#ReadBtn{position: absolute;float: right;right: 0px;width: auto;background: #0f962191;z-index: 99;color: white;text-align: center;margin: 5px;padding: 5px;border-radius: 5px;cursor: pointer;font-size:14px  !important; line-height: 100% !important;}");
GM_addStyle(".html_body_readmodel{overflow: hidden;}");
GM_addStyle(".article_content_readmodel{position: fixed !important;top: 0px;left: 0px;width: 100%;z-index: 99;overflow: auto !important;height: 100%;background: white;padding: 20px;border:10px solid #bce4cba8;margin: 0 !important;}");
GM_addStyle(".postBody{margin-top: 20px;}");
GM_addStyle(".readBtn_float{position: fixed !important;right: 40px !important;}");
GM_addStyle(".markdown_views{padding-top: 40px !important;}");
GM_addStyle(".htmledit_views{padding-top: 40px !important;}");
GM_addStyle(".markdown_views img{margin:24px auto !important;display: flow-root;}");
GM_addStyle(".htmledit_views img{margin:24px auto !important;display: flow-root;}");
GM_addStyle("#ReproduceBtn{right: 80px;font-size:14px;}");
GM_addStyle(".ReproduceBtn_float{position: fixed !important;right: 120px !important;}");

(function(){
        'use strict';
  
          var divView = document.createElement("div");
          divView.setAttribute("id", "ReadBtn");
          divView.innerHTML ='阅读模式';  
          var cnblog=document.getElementById('cnblogs_post_body')?true:false;
          var article=document.getElementsByClassName('article_content')[0]||document.getElementsByClassName('postBody')[0]||document.getElementsByClassName('blogpost-body')[0];
          if(cnblog){ 
            divView.style.marginTop="-40px";
            divView.style.position="relative";
          }
          if(article)article.insertBefore(divView,article.childNodes[0]); 
          //自动展开文章内容
          var readMoreBtn=document.getElementsByClassName('btn-readmore')[0];
          if(readMoreBtn){readMoreBtn.click(); }
          
          var reproduceBtn=document.getElementById('ReproduceBtn')
          setTimeout(function(){
                    reproduceBtn=document.getElementById('ReproduceBtn')
                    if(reproduceBtn){reproduceBtn.style.right="80px";}
                      },500);
          
          divView.onclick=function()
          {
              reproduceBtn=document.getElementById('ReproduceBtn')
              if(divView.innerHTML=='阅读模式')
              {
                  divView.innerHTML ='浏览模式';
                  addClass(article,"article_content_readmodel");
                  addClass(document.body,"html_body_readmodel");
                  addClass(divView,"readBtn_float");
                  if(reproduceBtn){addClass(reproduceBtn,"ReproduceBtn_float");}
                  if(cnblog){
                    article.style.width="calc(100% - 60px)";
                    article.style.height="calc(100% - 60px)";
                    divView.style.marginTop="5px";
                    reproduceBtn.style.marginTop="5px";
                  }
                  
                  
              }
              else
             {             
                  divView.innerHTML ='阅读模式';              
                  removeClass(article,"article_content_readmodel");
                  removeClass(document.body,"html_body_readmodel");
                  removeClass(divView,"readBtn_float"); 
                  if(reproduceBtn){removeClass(reproduceBtn,"ReproduceBtn_float");}
                  if(cnblog){ 
                    divView.style.marginTop="-40px";
                    divView.style.position="relative";
                    reproduceBtn.style.marginTop="-40px";
                    reproduceBtn.style.position="relative";
                    article.style.width="";
                    article.style.height="";
                  }
             }
          }
          
       
          
            
        //检测样式
        function hasClass(ele, cls) {
          return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
        }
        //添加样式
        function addClass(ele, cls) {
            if (!hasClass(ele, cls)) ele.className += " " + cls;
        }
        //删除样式
        function removeClass(ele, cls) {
            if (hasClass(ele, cls)) {
                var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                ele.className = ele.className.replace(reg, " ");
            }
        }  
        if(location.href=="http://csdn.admans.net/"||location.href=="http://csdn.admans.cn/")
        {
          Array.prototype.forEach.call(document.body.querySelectorAll("div"), function(ele) {         
            if (ele) {
              ele.parentNode.removeChild(ele);
            }
          }); 
        }
    })();
