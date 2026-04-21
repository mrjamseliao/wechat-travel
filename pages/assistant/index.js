Page({
  data: {
    // 输入相关
    inputText: '',
    quickSelected: null,
    
    // 状态相关
    isLoading: false,
    hasResult: false,
    showSuccess: false,
    
    // 图片URL常量
    imageUrls: {
      // 图标
      LOGO_MOUNTAIN: 'https://img.icons8.com/color/96/000000/mountain.png',
      ICON_MAP: 'https://img.icons8.com/color/96/000000/map-marker.png',
      ICON_ROUTE: 'https://img.icons8.com/color/96/000000/route.png',
      ICON_LIGHTBULB: 'https://img.icons8.com/color/96/000000/idea.png',
      ICON_MAGIC: '',
      ICON_COMPASS: 'https://img.icons8.com/color/96/000000/compass.png',
      ICON_LOCATION: 'https://img.icons8.com/color/96/000000/marker.png',
      ICON_CALENDAR: 'https://img.icons8.com/color/96/000000/calendar.png',
      ICON_USERS: 'https://img.icons8.com/color/96/000000/conference.png',
      ICON_SUN: 'https://img.icons8.com/color/96/000000/sun.png',
      ICON_DAY: 'https://img.icons8.com/color/96/000000/date.png',
      ICON_CLOCK: 'https://img.icons8.com/color/96/000000/clock.png',
      ICON_COPY: 'https://img.icons8.com/color/96/000000/copy.png',
      ICON_SAVE: 'https://img.icons8.com/color/96/000000/save.png',
      ICON_SHARE: 'https://img.icons8.com/color/96/000000/share.png',
      ICON_STAR: 'https://img.icons8.com/color/96/000000/star.png',
      ICON_FOOD: 'https://img.icons8.com/color/96/000000/restaurant.png',
      ICON_CAMERA: 'https://img.icons8.com/color/96/000000/camera.png',
      ICON_HOME: 'https://img.icons8.com/color/96/000000/home.png',
      ICON_CHECK: 'https://img.icons8.com/color/96/000000/checkmark.png',
      
      // 示例村落图片
      VILLAGE_1: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      VILLAGE_2: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
      VILLAGE_3: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      
      // 分享封面
      SHARE_COVER: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=630&fit=crop'
    },
    
    // 攻略数据
    itineraryData: {
      title: '',
      destination: '',
      days: 0,
      people: 0,
      season: '',
      daysDetail: [],
      tips: []
    }
  },

  onLoad: function() {
    console.log('村落云游AI攻略助手页面加载');
  },

  // 输入变化处理
  onInputChange: function(e) {
    this.setData({
      inputText: e.detail.value,
      quickSelected: null
    });
  },

  // 快速选择处理
  onQuickSelect: function(e) {
    const index = e.currentTarget.dataset.index;
    const text = e.currentTarget.dataset.text;
    
    this.setData({
      inputText: text,
      quickSelected: parseInt(index)
    });
  },

  // 生成攻略
  onGenerateItinerary: function() {
    const inputText = this.data.inputText.trim();
    
    if (!inputText) {
      wx.showToast({
        title: '请输入村落信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 显示加载
    this.setData({ isLoading: true });
    
    // 模拟AI生成过程
    setTimeout(() => {
      // 生成攻略数据
      const itinerary = this.generateItineraryData(inputText);
      
      // 更新数据
      this.setData({
        isLoading: false,
        hasResult: true,
        itineraryData: itinerary
      });
      
      // 显示成功提示
      this.showSuccessToast();
      
      // 滚动到结果区域
      this.scrollToResult();
    }, 1500);
  },

  // 生成攻略数据
  generateItineraryData: function(inputText) {
    // 预设攻略数据
    const itineraries = {
      '浙江古村落三日游': {
        title: '浙江古村落三日游攻略',
        destination: '浙江丽水、温州地区',
        days: 3,
        people: 2,
        season: '春季/秋季',
        daysDetail: [
          {
            day: 1,
            title: '古堰画乡与云和梯田',
            activities: [
              { time: '08:00-09:00', desc: '从丽水市区出发，前往古堰画乡（约1小时车程）' },
              { time: '09:00-12:00', desc: '游览古堰画乡，欣赏瓯江帆影、千年古樟群' },
              { time: '12:00-13:30', desc: '品尝当地农家菜，推荐溪鱼、竹笋等特色菜肴' },
              { time: '14:00-17:00', desc: '前往云和梯田，欣赏中国最美梯田景观' },
              { time: '18:00-19:30', desc: '入住梯田景区内的特色民宿，享用农家晚餐' }
            ]
          },
          {
            day: 2,
            title: '楠溪江古村落探秘',
            activities: [
              { time: '08:00-10:00', desc: '前往温州永嘉楠溪江景区（约2小时车程）' },
              { time: '10:00-12:00', desc: '游览芙蓉古村，欣赏明清古建筑群' },
              { time: '12:00-13:30', desc: '品尝楠溪江特色美食：麦饼、锦粉饺' },
              { time: '14:00-17:00', desc: '参观苍坡古村，体验耕读文化' },
              { time: '17:30-19:00', desc: '入住楠溪江畔民宿，欣赏江边日落' }
            ]
          },
          {
            day: 3,
            title: '泰顺廊桥文化之旅',
            activities: [
              { time: '08:00-09:30', desc: '前往泰顺县（约1.5小时车程）' },
              { time: '09:30-12:00', desc: '游览北涧桥、溪东桥等国宝级廊桥' },
              { time: '12:00-13:30', desc: '品尝泰顺特色农家宴' },
              { time: '14:00-16:00', desc: '参观徐岙底古村落，体验传统手工艺' },
              { time: '16:30-18:00', desc: '返回丽水市区，结束愉快的古村落之旅' }
            ]
          }
        ],
        tips: [
          '最佳旅行时间：春季（3-5月）和秋季（9-11月），气候宜人，景色最美',
          '交通建议：建议自驾或包车，方便前往各个分散的古村落',
          '摄影建议：清晨和黄昏是拍摄古村落的最佳时间，光线柔和，氛围感强',
          '住宿推荐：优先选择古村落内的特色民宿，体验当地生活氛围',
          '必尝美食：丽水溪鱼、竹笋、永嘉麦饼、泰顺婆饼'
        ]
      },
      '安徽徽派建筑两日游': {
        title: '安徽徽派建筑两日游攻略',
        destination: '安徽黄山黟县',
        days: 2,
        people: 2,
        season: '全年，秋季最佳',
        daysDetail: [
          {
            day: 1,
            title: '宏村与西递世界文化遗产',
            activities: [
              { time: '08:00-09:00', desc: '从黄山市区出发，前往宏村（约1小时车程）' },
              { time: '09:00-12:30', desc: '游览宏村，欣赏南湖、月沼和徽派古民居' },
              { time: '12:30-14:00', desc: '品尝徽州特色菜：臭鳜鱼、毛豆腐' },
              { time: '14:30-17:30', desc: '前往西递古村，参观胡文光刺史牌坊和敬爱堂' },
              { time: '18:00-19:30', desc: '入住宏村特色客栈，欣赏夜景' }
            ]
          },
          {
            day: 2,
            title: '徽州文化深度体验',
            activities: [
              { time: '08:30-10:00', desc: '参观徽州文化博物馆，了解徽商历史' },
              { time: '10:30-12:30', desc: '体验徽州传统手工艺：徽墨制作' },
              { time: '12:30-14:00', desc: '品尝农家土菜，休息放松' },
              { time: '14:30-16:30', desc: '游览南屏古村，感受《菊豆》拍摄地氛围' },
              { time: '17:00-18:30', desc: '返回黄山市区，结束徽派建筑之旅' }
            ]
          }
        ],
        tips: [
          '摄影建议：宏村月沼清晨和黄昏拍摄效果最佳，水面倒影非常美丽',
          '门票提示：建议购买黟县联票，包含多个古村落，性价比更高',
          '住宿推荐：宏村内有许多由古民居改造的精品客栈，体验感极佳',
          '特色体验：可以尝试穿汉服在古村落中拍照，非常有感觉',
          '购物推荐：徽州文房四宝、茶叶和特色小吃都是不错的伴手礼'
        ]
      },
      '云南梯田摄影之旅': {
        title: '云南梯田摄影之旅攻略',
        destination: '云南红河哈尼梯田',
        days: 4,
        people: 1,
        season: '11月-次年4月',
        daysDetail: [
          {
            day: 1,
            title: '抵达与多依树梯田',
            activities: [
              { time: '全天', desc: '抵达昆明后转机或乘车前往元阳（约6小时）' },
              { time: '傍晚', desc: '入住多依树景区附近客栈' },
              { time: '日落时分', desc: '拍摄多依树梯田日落景观' }
            ]
          },
          {
            day: 2,
            title: '多依树日出与坝达梯田',
            activities: [
              { time: '06:00-08:00', desc: '拍摄多依树梯田日出（最佳摄影点）' },
              { time: '09:00-12:00', desc: '走访哈尼族村寨，了解梯田文化' },
              { time: '14:00-17:00', desc: '前往坝达梯田，拍摄大面积梯田景观' },
              { time: '17:30-19:00', desc: '拍摄坝达梯田日落' }
            ]
          },
          {
            day: 3,
            title: '老虎嘴与箐口梯田',
            activities: [
              { time: '08:00-10:00', desc: '前往老虎嘴梯田，拍摄险峻梯田景观' },
              { time: '11:00-15:00', desc: '前往箐口民俗村，拍摄蘑菇房和民俗活动' },
              { time: '16:00-18:00', desc: '拍摄爱春蓝梯田（特殊光线下的蓝色梯田）' }
            ]
          },
          {
            day: 4,
            title: '返程与总结',
            activities: [
              { time: '上午', desc: '整理摄影作品，补拍一些细节场景' },
              { time: '下午', desc: '返回昆明，结束梯田摄影之旅' }
            ]
          }
        ],
        tips: [
          '最佳拍摄时间：11月-次年4月是梯田灌水期，光影效果最佳',
          '摄影器材：建议携带广角镜头拍摄大场景，长焦镜头拍摄细节',
          '天气注意：山区天气多变，需准备防雨设备和保暖衣物',
          '住宿建议：多依树景区附近客栈视野好，方便拍摄日出',
          '当地交通：梯田景区分散，建议包车或参加摄影团'
        ]
      },
      '福建土楼文化体验': {
        title: '福建土楼文化体验攻略',
        destination: '福建永定、南靖土楼群',
        days: 3,
        people: 2,
        season: '春季/秋季',
        daysDetail: [
          {
            day: 1,
            title: '永定土楼群探访',
            activities: [
              { time: '08:00-12:00', desc: '从厦门出发，前往永定土楼（约3小时车程）' },
              { time: '12:00-13:30', desc: '品尝客家特色美食：酿豆腐、盐焗鸡' },
              { time: '14:00-17:00', desc: '参观洪坑土楼群，包括振成楼、奎聚楼' },
              { time: '18:00-20:00', desc: '入住土楼特色客栈，体验土楼夜晚生活' }
            ]
          },
          {
            day: 2,
            title: '南靖土楼与云水谣',
            activities: [
              { time: '09:00-12:00', desc: '前往南靖田螺坑土楼群，观看"四菜一汤"' },
              { time: '12:30-14:00', desc: '品尝当地农家菜，休息片刻' },
              { time: '14:30-17:30', desc: '游览云水谣古镇，感受《云水谣》电影拍摄地' },
              { time: '18:00-19:30', desc: '返回客栈，品尝客家晚宴' }
            ]
          },
          {
            day: 3,
            title: '土楼文化深度体验',
            activities: [
              { time: '09:00-11:30', desc: '参观承启楼（土楼王），了解土楼建筑特色' },
              { time: '12:00-13:30', desc: '品尝最后一顿客家美食' },
              { time: '14:00-17:00', desc: '体验客家传统手工艺：土楼模型制作' },
              { time: '17:30', desc: '返回厦门，结束土楼文化之旅' }
            ]
          }
        ],
        tips: [
          '最佳游览时间：避开雨季（5-8月），春秋季节气候最适宜',
          '住宿选择：可以体验土楼内客栈，但条件较简单；也可选择周边现代客栈',
          '摄影建议：田螺坑观景台是拍摄"四菜一汤"全景的最佳位置',
          '文化体验：可以观看客家土楼歌舞表演，了解客家民俗文化',
          '购物推荐：客家茶叶、土楼模型、手工姜糖都是不错的纪念品'
        ]
      }
    };
    
    // 根据输入匹配攻略
    let matchedItinerary = null;
    
    for (const key in itineraries) {
      if (inputText.includes(key)) {
        matchedItinerary = itineraries[key];
        break;
      }
    }
    
    // 如果没有匹配，生成通用攻略
    if (!matchedItinerary) {
      matchedItinerary = {
        title: `"${inputText}"村落云游攻略`,
        destination: '根据您的输入定制',
        days: 3,
        people: 2,
        season: '春季/秋季最佳',
        daysDetail: [
          {
            day: 1,
            title: '抵达与村落初探',
            activities: [
              { time: '上午', desc: '抵达目的地，入住当地特色民宿' },
              { time: '中午', desc: '品尝当地特色农家菜' },
              { time: '下午', desc: '初步探索村落，了解村落历史和文化' },
              { time: '傍晚', desc: '欣赏村落日落美景，拍摄照片' },
              { time: '晚上', desc: '体验当地民俗活动或传统手工艺' }
            ]
          },
          {
            day: 2,
            title: '深度体验村落生活',
            activities: [
              { time: '清晨', desc: '早起拍摄村落晨景，感受宁静的乡村氛围' },
              { time: '上午', desc: '参观村落特色景点和文化遗产' },
              { time: '中午', desc: '享用当地特色午餐，与村民交流' },
              { time: '下午', desc: '参与农事活动或传统手工艺体验' },
              { time: '晚上', desc: '品尝地道农家晚宴，享受乡村夜晚' }
            ]
          },
          {
            day: 3,
            title: '周边探索与返程',
            activities: [
              { time: '上午', desc: '探索村落周边自然景观或特色景点' },
              { time: '中午', desc: '最后品尝当地特色美食' },
              { time: '下午', desc: '购买当地特产作为纪念，准备返程' }
            ]
          }
        ],
        tips: [
          '最佳旅行时间：春秋季节气候适宜，景色最美',
          '交通建议：村落交通可能不便，建议提前规划好交通方式',
          '住宿选择：优先选择有特色的当地民宿，体验更深入',
          '摄影建议：清晨和黄昏的光线最适合拍摄村落景观',
          '尊重文化：尊重当地风俗习惯，与村民友好交流'
        ]
      };
    }
    
    return matchedItinerary;
  },

  // 显示成功提示
  showSuccessToast: function() {
    this.setData({ showSuccess: true });
    
    setTimeout(() => {
      this.setData({ showSuccess: false });
    }, 3000);
  },

  // 滚动到结果区域
  scrollToResult: function() {
    wx.createSelectorQuery()
      .select('.output-section')
      .boundingClientRect()
      .exec((res) => {
        if (res[0]) {
          wx.pageScrollTo({
            scrollTop: res[0].top - 50,
            duration: 500
          });
        }
      });
  },

  // 复制攻略
  onCopyItinerary: function() {
    if (!this.data.hasResult) {
      wx.showToast({
        title: '请先生成攻略',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    const text = this.formatItineraryForCopy();
    
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: '攻略已复制',
          icon: 'success',
          duration: 2000
        });
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 格式化攻略用于复制
  formatItineraryForCopy: function() {
    const data = this.data.itineraryData;
    let text = `${data.title}\n\n`;
    text += `目的地：${data.destination}\n`;
    text += `行程天数：${data.days}天\n`;
    text += `建议人数：${data.people}人\n`;
    text += `推荐季节：${data.season}\n\n`;
    
    text += '行程安排：\n';
    data.daysDetail.forEach(day => {
      text += `\n第${day.day}天：${day.title}\n`;
      day.activities.forEach(activity => {
        text += `  ${activity.time} ${activity.desc}\n`;
      });
    });
    
    text += '\n实用贴士：\n';
    data.tips.forEach((tip, index) => {
      text += `  ${index + 1}. ${tip}\n`;
    });
    
    text += '\n—— 由村落云游AI攻略助手生成 ——';
    return text;
  },

  // 保存攻略
  onSaveItinerary: function() {
    if (!this.data.hasResult) {
      wx.showToast({
        title: '请先生成攻略',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 模拟保存到本地存储
    try {
      const savedItineraries = wx.getStorageSync('savedItineraries') || [];
      savedItineraries.unshift({
        ...this.data.itineraryData,
        savedTime: new Date().toISOString()
      });
      
      wx.setStorageSync('savedItineraries', savedItineraries.slice(0, 20)); // 最多保存20条
      
      wx.showToast({
        title: '攻略已保存',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      wx.showToast({
        title: '保存失败',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 分享攻略
  onShareItinerary: function() {
    if (!this.data.hasResult) {
      wx.showToast({
        title: '请先生成攻略',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  // 页面分享
  onShareAppMessage: function() {
    if (this.data.hasResult) {
      return {
        title: this.data.itineraryData.title,
        path: '/pages/index/index',
        imageUrl: this.data.imageUrls.SHARE_COVER
      };
    }
    
    return {
      title: '村落云游AI攻略助手 - 智能规划您的乡村旅行',
      path: '/pages/index/index',
      imageUrl: this.data.imageUrls.SHARE_COVER
    };
  }
});