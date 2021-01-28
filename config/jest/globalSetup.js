module.exports = async () => {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';
};
console.log(1);
