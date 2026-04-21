// app.js
App({
  onLaunch() {
    // 小程序启动时执行
    wx.cloud.init({
      env: 'wx04f41b5e93e85885', // 云环境ID
      traceUser: true
    });
  },
  
  globalData: {
    userInfo: null,
    currentCity: '成都', // 默认城市
    favorites: [], // 收藏列表
    recentSearches: [] // 最近搜索
  },
  
  // 添加到收藏
  addToFavorites(item) {
    const favorites = this.globalData.favorites;
    if (!favorites.some(fav => fav.id === item.id)) {
      favorites.push(item);
      wx.showToast({
        title: '已收藏',
        icon: 'success'
      });
    }
  },
  
  // 移除收藏
  removeFromFavorites(id) {
    this.globalData.favorites = this.globalData.favorites.filter(item => item.id !== id);
  }
});