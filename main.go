package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	//"fmt"
	"github.com/gin-gonic/gin"
	//"github.com/gin-gonic/gin/binding"
	"188bet/models"
	"net/http"
)

func main() {
	router := gin.Default()

	router.Static("/public", "./public")
	router.Static("/Public", "./public")
	router.Static("/testjson", "./testjson")
	router.Static("Live-Center", "./Live-Center")
	//模板路径定义
	//router.LoadHTMLGlob("templates/*")
	router.LoadHTMLGlob("templates/*")

	router.GET("/zh-cn/sports/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "千年古泉-碧泉潭",
		})
	})

	router.GET("/zh-cn/sports/:id/:name", func(c *gin.Context) {
		id := c.Param("id")
		name := c.Param("name")

		templates := "sports-name.html"

		if strings.EqualFold(id, "all") {
			templates = "in-play.html"
		} else if strings.EqualFold(id, "football") {
			templates = "full-time-asian-handicap-and-over-under.html"
		}

		c.HTML(http.StatusOK, templates, gin.H{
			"title": "千年古泉-碧泉潭",
		})
		c.String(http.StatusOK, "Hello %s %s", id, name)
	})

	// router.GET("/zh-cn/sports/all/in-play", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "in-play.html", gin.H{
	// 		"title": "千年古泉-碧泉潭",
	// 	})
	// })

	// router.GET("/zh-cn/sports/football/matches-by-date/today/full-time-asian-handicap-and-over-under", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "full-time-asian-handicap-and-over-under.html", gin.H{
	// 		"title": "千年古泉-碧泉潭",
	// 	})
	// })

	/*
	   	router.POST("/form_post", func(c *gin.Context) {
	           message := c.PostForm("message")
	           nick := c.DefaultPostForm("nick", "anonymous")
	   	})
	*/

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

	//GetData
	router.POST("/zh-cn/Service/CentralService", func(c *gin.Context) {
		//fmt.Println(c.Request.RequestURI)
		var reqUrl = c.PostForm("reqUrl")

		//fmt.Println(reqUrl)
		var xxxjson string
		var posturl = c.Request.RequestURI

		if strings.EqualFold(reqUrl, "/zh-cn/sports/") {
			if strings.Contains(posturl, "GetDataLCSB") {
				xxxjson = readFile1("testjson/GetDataLCSB.json")
			} else if strings.Contains(posturl, "GetData") {
				xxxjson = readFile1("testjson/GetData.json")
			}
		} else if strings.EqualFold(reqUrl, "/zh-cn/sports/all/in-play") {
			xxxjson = readFile1("testjson/GetData_in-play.json")

		} else if strings.EqualFold(reqUrl, "/zh-cn/sports/football/matches-by-date/today/full-time-asian-handicap-and-over-under") {
			xxxjson = readFile1("testjson/GetData3.json")
		} else {
			xxxjson = readFile1("testjson/GetData4.json")
		}

		//jsonTostruct(xxxjson)
		//fmt.Println(xxxjson)
		c.Writer.WriteString(xxxjson)
	})

	router.GET("/zh-cn/Service/LiveTv", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"pvdr":   "p",
			"strmId": 0,
			"isBgs":  true,
		})
	})

	//盘口
	//zh-cn/Service/OddsService?UpdateOddsType&ts=1521468957917&OddsType=1&IsFirstLoad=true&_=1521467876360
	router.GET("/zh-cn/Service/OddsService", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"suc": "true",
		})
	})

	router.GET("/api/LiveCenter/GetLiveStreamInfo", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"ReturnCode":  "0",
			"Message":     "Success",
			"SysDateTime": "2018/03/17 10:29:12 -04:00",
			"Response": gin.H{
				"EventId":       "2467795",
				"LsEventId":     "0",
				"PartnerId":     "0",
				"VideoProvider": nil,
				"StreamURL":     nil,
				"ViewData":      nil,
				"HasCoverage":   true,
			},
		})
	})

	router.GET("/api/Match/FetchMatchLineup", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"pvdr":   "p",
			"strmId": 0,
			"isBgs":  true,
		})
	})

	router.GET("/product", func(c *gin.Context) {
		c.HTML(http.StatusOK, "product.tmpl", gin.H{
			"title": "碧泉潭",
		})
	})

	//CentraServicePost()

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

func jsonTostruct(strjson string) {
	//var headers string = `{"encryption":"md5","timestamp":1482463793,"key":"2342874840784a81d4d9e335aaf76260","partnercode":100034}`
	CentralService := models.CentralService{}
	json.Unmarshal([]byte(strjson), &CentralService) //json解析到结构体里面
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
