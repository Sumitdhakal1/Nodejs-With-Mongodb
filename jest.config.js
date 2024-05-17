module.exports={
  testMatch:[
   '<rootDir>/test/*.test.js'
  ],
  
    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
      transformIgnorePatterns: [
        '/node_modules/(?!d3-(array|format|geo))'
      ]
    
}