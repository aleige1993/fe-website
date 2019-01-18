/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CmsMerchantReg', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    merchantType: {
      field: 'merchant_type',
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    provinceCode: {
      field: 'province_code',
      type: DataTypes.STRING,
      allowNull: false
    },
    provinceName: {
      field: 'province_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    cityCode: {
      field: 'city_code',
      type: DataTypes.STRING,
      allowNull: false
    },
    cityName: {
      field: 'city_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    districtCode: {
      field: 'district_code',
      type: DataTypes.STRING,
      allowNull: false
    },
    districtName: {
      field: 'district_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    contactName: {
      field: 'contact_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    contactSex: {
      field: 'contact_sex',
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    contactTel: {
      field: 'contact_tel',
      type: DataTypes.STRING,
      allowNull: false
    },
    gmtCreate: {
      field: 'gmt_create',
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        if (this.getDataValue('gmtCreate')) {
          return dateTime.dateTimeToString(this.getDataValue('gmtCreate'));
        } else {
          return null;
        }
      }
    },
    remark: {
      field: 'remark',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'cms_merchant_reg',
    timestamps: false,
    freezeTableName: true
  });
};
