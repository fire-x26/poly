# Digital Option
1.代码结构

    cmc.sol      代币合约 
    option.sol   DO逻辑合约 
    proxy.sol    DO主合约
    DO主合约的功能 -- 发行（issue），销毁（redeem），转让（transfer），变现（convert，CCT合约没有变现功能）

2.部署地址

    bsc testnet：
      cmc合约地址：0x822DccaB9b9a2723c1446d3fb6DC55f86060e4Ac
      option合约地址：0x44C981B8391368168986E88e76CB51F498165B01
      option主合约地址：0x27e6494eE534A3dfDFE95F0BfB201D5AB2C805d3 

    Polygon MainNet：
      cmc合约地址：0x0a12567712f817905aaB48F9BC7F778329Fd1573
      option合约地址：0x6FD458a8f5fFf7F2258B914818F0c6eF75775A82
      option主合约地址：0x2Fc1C844b5d0c6C00e9A50b3A38e80Ab01b1BC67   

  3.合约部署/操作流程
  
    1.部署cmc.sol；option.sol；proxy.sol；共三个合约
    
    2.通过插件验证并发布每个合约的源代码
    
    3.调用Proxy合约的setTarget函数，设置Logic合约地址为option.sol部署的地址
    
    4.通过Proxy调用Logic合约的initialize函数，以进行合约的数据初始化


  4.iSCAT AM 公钥地址
    
    1. 0x366B668A7794AF33e7Ece738B3549516d30383cA

