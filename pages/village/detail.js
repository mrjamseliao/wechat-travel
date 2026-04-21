// pages/village/detail.js
Page({
  data: {
    // 是否收藏
    isFavorite: false,
    
    // 图片列表
    photoList: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        label: '古村全景'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        label: '明清建筑'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        label: '小桥流水'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        label: '竹林深处'
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        label: '晨雾古村'
      }
    ],
    
    // 实用贴士
    tipsList: [
      '建议穿着舒适的平底鞋，村落内多为石板路',
      '最佳拍摄时间为清晨和黄昏，光线柔和，游客较少',
      '可提前了解当地民俗节庆活动，体验更丰富的文化',
      '村落内有多家特色民宿，建议提前预订',
      '尊重当地风俗习惯，保护古建筑，不随意触摸文物',
      '村内餐饮以农家菜为主，可品尝当地特色美食'
    ],
    
    // 图片预览相关
    showPhotoModal: false,
    currentPhotoIndex: 0
  },

  onLoad: function(options) {
    console.log('村落详情页加载，参数：', options);
    
    // 从路由参数中获取村落ID
    const villageId = options.id || 1;
    console.log('当前村落ID：', villageId);
    
    // 这里可以调用API获取村落详情数据
    // 根据villageId加载对应的村落信息
    
    // 检查是否已收藏
    this.checkFavoriteStatus(villageId);
  },

  onShow: function() {
    console.log('村落详情页显示');
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 分享功能
  onShare: function() {
    wx.showToast({
      title: '已生成分享卡片',
      icon: 'success',
      duration: 1500
    });
  },

  // 收藏功能
  onFavorite: function() {
    const isFavorite = !this.data.isFavorite;
    this.setData({
      isFavorite: isFavorite
    });
    
    wx.showToast({
      title: isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1000
    });
    
    // 这里可以调用API更新收藏状态
  },

  // 检查收藏状态
  checkFavoriteStatus: function(villageId) {
    // 这里可以调用API检查是否已收藏
    // 模拟数据
    const isFavorite = false; // 假设默认未收藏
    this.setData({
      isFavorite: isFavorite
    });
  },

  // 导航功能
  onNavigate: function() {
    wx.showModal({
      title: '导航提示',
      content: '是否要打开地图应用进行导航？',
      success: function(res) {
        if (res.confirm) {
          // 这里可以调用微信的打开地图API
          wx.showToast({
            title: '正在打开地图...',
            icon: 'loading',
            duration: 1000
          });
          
          // 模拟打开地图
          setTimeout(() => {
            wx.showToast({
              title: '请在外部地图应用中查看路线',
              icon: 'none',
              duration: 2000
            });
          }, 1000);
        }
      }
    });
  },

  // 查看全部照片
  viewAllPhotos: function() {
    this.setData({
      showPhotoModal: true,
      currentPhotoIndex: 0
    });
  },

  // 查看单张照片
  viewPhoto: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      showPhotoModal: true,
      currentPhotoIndex: index
    });
  },

  // 轮播图切换
  onSwiperChange: function(e) {
    this.setData({
      currentPhotoIndex: e.detail.current
    });
  },

  // 关闭图片预览
  closePhotoModal: function() {
    this.setData({
      showPhotoModal: false
    });
  },

  // 防止触摸穿透
  preventTouchMove: function() {
    return;
  },

  // 在线咨询
  onConsult: function() {
    wx.showToast({
      title: '即将打开客服',
      icon: 'success',
      duration: 1000
    });
    
    // 这里可以跳转到客服页面或打开客服对话框
  },

  // 立即预订
  onBookTour: function() {
    wx.showModal({
      title: '预订提示',
      content: '您确定要预订云水谣古村落之旅吗？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/booking/booking'
          });
        }
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    console.log('下拉刷新村落详情');
    
    // 模拟数据更新
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '数据已更新',
        icon: 'success',
        duration: 1000
      });
    }, 1000);
  },

  // 分享到朋友圈
  onShareAppMessage: function() {
    return {
      title: '云水谣古村落 | 保存完好的明清古建筑群',
      path: '/pages/village/detail?id=1',
      imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
  },

  // 分享到好友
  onShareTimeline: function() {
    return {
      title: '云水谣古村落 | 保存完好的明清古建筑群',
      query: 'id=1',
      imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
  }
});