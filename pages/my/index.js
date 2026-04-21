// my.js
Page({
  data: {
    // 用户信息
    userInfo: {
      avatar: 'https://img.icons8.com/color/96/000000/user.png',
      name: '云游者',
      level: 3,
      levelName: '乡村探索者'
    },
    
    // 统计数据
    stats: {
      exploredVillages: 12,
      collectedVillages: 8,
      collectedItineraries: 6
    },
    
    // 当前选中的标签页
    currentTab: 3
  },

  onLoad: function() {
    console.log('我的页面加载');
    this.loadUserInfo();
  },

  onShow: function() {
    // 页面显示时更新数据
    this.updateStats();
  },

  // 加载用户信息
  loadUserInfo: function() {
    // 实际开发中应该从服务器或本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
  },

  // 更新统计数据
  updateStats: function() {
    // 实际开发中应该从服务器获取统计数据
    const stats = wx.getStorageSync('userStats');
    if (stats) {
      this.setData({
        stats: stats
      });
    }
  },

  // 切换标签页
  switchTab: function(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    
    if (index === this.data.currentTab) {
      return; // 当前页不需要切换
    }
    
    this.setData({
      currentTab: index
    });
    
    // 根据标签页执行不同操作
    switch(index) {
      case 0: // 首页
        wx.switchTab({
          url: '/pages/index/index'
        });
        break;
      case 1: // AI助手
        wx.switchTab({
          url: '/pages/ai-assistant/ai-assistant'
        });
        break;
      case 2: // 村落
        wx.switchTab({
          url: '/pages/scenic-spots/scenic-spots'
        });
        break;
      case 3: // 我的（当前页）
        // 已经在当前页，不需要跳转
        break;
    }
  },

  // 导航到我的收藏
  navigateToCollection: function() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    });
  },

  // 导航到我的攻略
  navigateToItinerary: function() {
    wx.navigateTo({
      url: '/pages/my-itinerary/my-itinerary'
    });
  },

  // 导航到我的订单
  navigateToOrders: function() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  },

  // 导航到浏览历史
  navigateToHistory: function() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  // 导航到客服
  navigateToCustomerService: function() {
    wx.showModal({
      title: '联系客服',
      content: '客服热线：400-123-4567\n工作时间：9:00-18:00',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 导航到意见反馈
  navigateToFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  // 导航到帮助中心
  navigateToHelp: function() {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },

  // 导航到通用设置
  navigateToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  // 导航到隐私设置
  navigateToPrivacy: function() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  },

  // 导航到关于页面
  navigateToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 探索更多
  exploreMore: function() {
    wx.switchTab({
      url: '/pages/scenic-spots/scenic-spots'
    });
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    console.log('下拉刷新');
    
    // 模拟刷新用户数据
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '数据已更新',
        icon: 'success',
        duration: 1000
      });
      
      // 更新统计数据
      const newStats = {
        exploredVillages: Math.floor(Math.random() * 5) + 12,
        collectedVillages: Math.floor(Math.random() * 3) + 8,
        collectedItineraries: Math.floor(Math.random() * 3) + 6
      };
      
      this.setData({
        stats: newStats
      });
    }, 1000);
  },

  // 页面分享
  onShareAppMessage: function() {
    return {
      title: '村落云游 - 发现乡村之美',
      path: '/pages/my/my',
      imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=630&fit=crop'
    };
  }
});