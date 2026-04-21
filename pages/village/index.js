// scenic-spots.js
Page({
  data: {
    // 当前选中的标签页
    currentTab: 0,
    
    // 景点数据
    scenicSpots: [
      {
        id: 1,
        name: '竹海人家',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=750&h=400&fit=crop',
        tags: ['竹林', '生态', '民宿'],
        description: '万亩竹海环绕的生态村落，体验竹编手工艺，品尝地道竹笋宴。',
        location: '浙江省安吉县',
        distance: '距您80km'
      },
      {
        id: 2,
        name: '梯田云上村',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=750&h=400&fit=crop',
        tags: ['梯田', '云海', '徒步'],
        description: '海拔800米的云上村落，春季油菜花海，秋季金色稻浪，四季美景如画。',
        location: '浙江省云和县',
        distance: '距您120km'
      },
      {
        id: 3,
        name: '云水谣古村落',
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=750&h=400&fit=crop',
        tags: ['古镇', '文化遗产', '摄影'],
        description: '保存完好的明清古建筑群，小桥流水人家，体验千年历史的文化沉淀。',
        location: '浙江省丽水市',
        distance: '距您150km'
      },
      {
        id: 4,
        name: '桃花源古村',
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=750&h=400&fit=crop',
        tags: ['桃花', '古村', '田园'],
        description: '三月桃花盛开如海，古村炊烟袅袅，宛如世外桃源般的美丽乡村。',
        location: '浙江省奉化市',
        distance: '距您90km'
      },
      {
        id: 5,
        name: '水上威尼斯',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=750&h=400&fit=crop',
        tags: ['水乡', '船游', '渔家'],
        description: '河道纵横交错的水乡村落，乘船游览，体验渔家生活，品尝鲜美的河鲜。',
        location: '浙江省嘉兴市',
        distance: '距您60km'
      }
    ],
    
    // 搜索关键词
    searchKeyword: ''
  },

  onLoad: function() {
    console.log('景点推荐页面加载');
  },

  onShow: function() {
    // 页面显示时的逻辑
  },

  // 切换标签页
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
    
    // 根据标签页执行不同操作
    switch(index) {
      case 0: // 首页
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
        break;
      case 1: // 探索
        wx.navigateTo({
          url: '/pages/explore/explore'
        });
        break;
      case 2: // 收藏
        wx.navigateTo({
          url: '/pages/favorites/favorites'
        });
        break;
      case 3: // 我的
        wx.navigateTo({
          url: '/pages/profile/profile'
        });
        break;
    }
  },

  // 搜索处理
  onSearchInput: function(e) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    // 实际项目中这里应该发送搜索请求
    console.log('搜索关键词:', keyword);
  },

  // 景点卡片点击事件
  onScenicTap: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '进入景点详情',
      icon: 'success',
      duration: 1000
    });
    
    // 实际项目中这里应该跳转到景点详情页
    console.log('点击景点ID:', id);
    
    // 模拟跳转到详情页
    wx.navigateTo({
      url: `/pages/village/detail?id=${id}`
    });
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    console.log('下拉刷新');
    
    // 模拟数据刷新
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    }, 1000);
  },

  // 上拉加载更多
  onReachBottom: function() {
    console.log('上拉加载更多');
    
    // 实际项目中这里应该加载更多数据
    wx.showToast({
      title: '加载更多',
      icon: 'loading',
      duration: 1000
    });
  }
});