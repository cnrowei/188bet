package main

import (
	"fmt"
	"encoding/json"
	"io/ioutil"
	"os"
	//"fmt"
	"github.com/gin-gonic/gin"
	//"github.com/gin-gonic/gin/binding"
	"net/http"
	"188bet/models"

)


func main() {
	router := gin.Default()
	router.Static("/public", "./public")
	router.Static("/testjson", "./testjson")
	router.Static("Live-Center","./Live-Center")
	//模板路径定义
	//router.LoadHTMLGlob("templates/*")
	router.LoadHTMLGlob("templates/*")

	router.GET("/zh-cn/sports/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "千年古泉-碧泉潭",
		})
	})

/*
	router.POST("/form_post", func(c *gin.Context) {
        message := c.PostForm("message")
        nick := c.DefaultPostForm("nick", "anonymous")
	})
*/
	router.GET("/hello", func(c *gin.Context) {
		c.HTML(http.StatusOK, "hello.tmpl", gin.H{
			"title": "碧泉潭",
		})
	})
	
	//匹配
	router.GET("/user/:name", func(c *gin.Context) {
        name := c.Param("name")
        c.String(http.StatusOK, "Hello %s", name)
	})
	
	//参数不存在的时候提供一个默认值
	router.GET("/welcome", func(c *gin.Context) {
        firstname := c.DefaultQuery("firstname", "Guest")
        lastname := c.Query("lastname")

        c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
	})
	
	router.POST("/zh-cn/Service/CentralService", func(c *gin.Context) {
		xxxjson := readFile1("testjson/GetData.json")

		//jsonTostruct(xxxjson)
		//fmt.Println(xxxjson)
        c.Writer.WriteString(xxxjson)
	})
	
	router.GET("/product", func(c *gin.Context) {
		c.HTML(http.StatusOK, "product.tmpl", gin.H{
			"title": "碧泉潭",
		})
	})

	CentraServicePost()


	router.Run(":8000")

	
}

/*
func RecResultJsonToPlain(jsonResult []byte)(recPlainResult string)  {
    var r models.CentralService
    json.Unmarshal(jsonResult, &r)
    for _, wsItem := range r.Lpd.Sm.Fe.Progms {
        for _, cwItem := range wsItem.CW {
            recPlainResult = recPlainResult + cwItem.W
        }
    }
    return recPlainResult
}
*/

func jsonTostruct(strjson string){
	//var headers string = `{"encryption":"md5","timestamp":1482463793,"key":"2342874840784a81d4d9e335aaf76260","partnercode":100034}`  
	CentralService := models.CentralService{}  
	json.Unmarshal([]byte(strjson), &CentralService)//json解析到结构体里面  
	fmt.Println(CentralService)
}


func readFile1(path string) string {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)
	return string(fd)
}