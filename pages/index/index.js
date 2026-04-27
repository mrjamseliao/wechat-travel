// index.js
Page({
  data: {
    // 热门推荐列表
    villageList: [
      {
        id: 1,
        name: '云水谣古村落',
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['古镇', '文化遗产', '摄影'],
        description: '保存完好的明清古建筑群，小桥流水人家，体验千年历史的文化沉淀。',
        location: '浙江省丽水市',
        distance: '距您120km'
      },
      {
        id: 2,
        name: '竹海人家',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['竹林', '生态', '民宿'],
        description: '万亩竹海环绕的生态村落，体验竹编手工艺，品尝地道竹笋宴。',
        location: '浙江省安吉县',
        distance: '距您80km'
      },
      {
        id: 3,
        name: '梯田云上村',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['梯田', '云海', '徒步'],
        description: '海拔800米的云上村落，春季油菜花海，秋季金色稻浪，四季美景如画。',
        location: '浙江省云和县',
        distance: '距您200km'
      }
    ],
    // 轮播图片列表
    photoList: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: '发现千年历史的文化遗产'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=576&q=80',
        description: '回归自然，体验田园生活'
      }
    ],
    currentCityIndex: 0,  // 当前城市索引
    cityList: ['成都', '北京', '上海', '广州', '深圳'],  // 城市列表
    userInfo: null,
    // 图片预览相关
    showPhotoModal: true,
    currentPhotoIndex: 0,
    statusBarHeight: 10,
    navbarHeight: 10, // 导航栏高度
    navPaddingTop: 18, // 新增：导航栏内部上边距
    separatorTop: 0, // 分隔线位置
  },
  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    const { statusBarHeight, platform } = systemInfo;
    
    let navbarHeight = 44;
    if (platform === 'android') {
      navbarHeight = 48;
    }
    
    // 计算分隔线位置（在导航栏底部）
    const separatorTop = statusBarHeight + navbarHeight;
    
    this.setData({
      statusBarHeight: statusBarHeight,
      navbarHeight: statusBarHeight + navbarHeight + 8, // 增加8px的padding
      navPaddingTop: 8, // 给导航栏内容增加上边距
      separatorTop: separatorTop
    });
  },

  // 城市选择
  selectCity() {
    wx.showActionSheet({
      itemList: this.data.cityList,
      success: (res) => {
        if (res.tapIndex !== undefined) {
          // 1. 记录选择日志
          console.log('选择了城市:', res.tapIndex, this.data.cityList[res.tapIndex]);
          
          // 2. 更新页面数据（关键！）
          this.setData({
            currentCityIndex: res.tapIndex
          });
          
          // 3. 如果需要，可以执行其他操作
          this.onCityChange(res.tapIndex);
        }
      },
      fail: (err) => {
        console.log('取消选择或选择失败:', err);
      }
    });
  },
  // 城市变更后的处理
  onCityChange(cityIndex) {
    const cityName = this.data.cityList[cityIndex];
    
    // 更新导航栏标题（如果有需要）
    wx.setNavigationBarTitle({
      title: cityName
    });
    
    // 这里可以添加其他逻辑，比如重新加载该城市的数据
    console.log('城市已切换为:', cityName);
    
    // 示例：重新加载该城市的村落数据
    this.loadVillageData(cityIndex);
  },
// 加载村落数据示例
loadVillageData(cityIndex) {
  const cityName = this.data.cityList[cityIndex];
  console.log(`开始加载${cityName}的村落数据...`);
  
  // 这里应该是实际的网络请求
  // wx.request({
  //   url: 'xxx',
  //   data: { city: cityName },
  //   success: (res) => {
  //     // 更新村落数据
  //   }
  // });
},

  // 跳转到搜索页
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  },

  onLoad: function() {
    console.log('村落云游首页加载');
    this.getUserInfo();
  },

  onShow: function() {
    // 页面显示时更新数据
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

  // 获取用户信息
  getUserInfo: function() {
    // 模拟用户信息
    this.setData({
      userInfo: {
        avatarUrl: 'https://avatars.dicebear.com/api/avataaars/123.png',
        nickName: '云游者'
      }
    });
  },

  // 导航到村落列表
  navigateToVillageList: function() {
    wx.showToast({
      title: '进入村落探索',
      icon: 'success',
      duration: 1000
    });
    wx.navigateTo({
      url: `/pages/village/index` 
    });
    // 实际开发中这里应该是 wx.navigateTo
    console.log('跳转到村落列表页');
  },

  // 导航到路线规划
  navigateToRoutes: function() {
    wx.showToast({
      title: '进入路线规划',
      icon: 'success',
      duration: 1000
    });
    console.log('跳转到路线规划页');
  },

  // 导航到民俗体验
  navigateToExperience: function() {
    wx.showToast({
      title: '进入民俗体验',
      icon: 'success',
      duration: 1000
    });
    console.log('跳转到民俗体验页');
  },

  // 导航到民宿预订
  navigateToHomestay: function() {
    wx.showToast({
      title: '进入民宿预订',
      icon: 'success',
      duration: 1000
    });
    console.log('跳转到民宿预订页');
  },

  // 导航到村落详情
  navigateToVillageDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/village/detail?id=${id}`  // 村落详情页面路径
    });
    wx.showToast({
      title: '查看村落详情',
      icon: 'success',
      duration: 1000
    });
    console.log('跳转到村落详情页，ID：', id);
  },

  // 导航到所有村落
  navigateToAllVillages: function() {
    wx.navigateTo({
      url: `/pages/village/index`
    });
    wx.showToast({
      title: '查看所有村落',
      icon: 'success',
      duration: 1000
    });
    console.log('跳转到所有村落页');
  },

  // 搜索功能
  onSearchInput: function(e) {
    const keyword = e.detail.value;
    console.log('搜索关键词:', keyword);
    // 实际开发中这里应该触发搜索逻辑
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    console.log('下拉刷新');
    // 模拟数据更新
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '数据已更新',
        icon: 'success'
      });
    }, 1000);
  }
});