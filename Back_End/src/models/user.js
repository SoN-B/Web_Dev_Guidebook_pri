"use strict";

const Sequelize = require('sequelize');
const config = require('config');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {  // 테이블 필드에 대한 설정
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true, // 중복 X
                    primaryKey: true,
                },
                username: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                profile: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                    defaultValue: config.get('s3.basic_image'),
                }
            },
            {  // 테이블 자체에 대한 설정
                sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
                timestamps: true, /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */
                modelName: 'User', /* 모델 이름을 설정. */
                tableName: 'userinfo', /* 데이터베이스의 테이블 이름. */
                charset: 'utf8', /* 인코딩 */
                collate: 'utf8_general_ci'
            }
        );
    }

    // 다른 모델과의 관계
    static associate(db) {
        db.User.hasMany(db.Content, { foreignKey: 'userkey', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.User.hasMany(db.Comment, { foreignKey: 'userkey', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.User.belongsToMany(db.Content, { through: 'HitContent' });
    }
};