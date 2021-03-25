/*
 Navicat Premium Data Transfer

 Source Server         : express
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : express

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 25/03/2021 15:51:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_delete` tinyint(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uname`(`name`) USING BTREE,
  UNIQUE INDEX `ualias`(`alias`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文章分类表\r\nis_delete:	0表示没有删除，1表示数据被删除\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '历史', 'story', 0);
INSERT INTO `article` VALUES (2, '科技', 'science', 0);
INSERT INTO `article` VALUES (3, '艺术', 'art', 0);
INSERT INTO `article` VALUES (4, '动漫', 'comic', 1);
INSERT INTO `article` VALUES (5, '音乐', 'music', 0);
INSERT INTO `article` VALUES (6, '绘画', 'draw', 1);

-- ----------------------------
-- Table structure for articleinfo
-- ----------------------------
DROP TABLE IF EXISTS `articleinfo`;
CREATE TABLE `articleinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cover_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pub_date` datetime(0) NOT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_delete` tinyint(4) NOT NULL DEFAULT 0,
  `cate_id` int(11) NOT NULL,
  `author_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articleinfo
-- ----------------------------
INSERT INTO `articleinfo` VALUES (1, 'apple', '最近更新', '\\uploads\\2f2cbe16bac469553c149695d7afef49', '2021-03-25 15:22:06', '已发布', 1, 1, 7);
INSERT INTO `articleinfo` VALUES (2, '123', 'abcd', '\\uploads\\839646bec69feea51f05370c377aab71', '2021-03-25 14:26:13', '草稿', 0, 1, 7);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_pic` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'zs', '123456', NULL, NULL, NULL);
INSERT INTO `users` VALUES (3, 'alis', '$2a$10$MaSGmybLPHyxfwSduEmxH.Gb8bx8/JlwL6MQEnozdeHCGIIRjWhTi', NULL, NULL, NULL);
INSERT INTO `users` VALUES (4, 'heyzj', '$2a$10$K1BfcIEIfoTsxWNPkAEmX.OKLL3G09wNmfMbPykchEw5Zj5uadZD.', NULL, NULL, NULL);
INSERT INTO `users` VALUES (5, 'admin', '$2a$10$nE06IPRGjWP13gqalSUYC.bg8Pen6GVDGRoZKOgk5ieRtVxDw1rGG', '管理员', 'admin@qq.com', NULL);
INSERT INTO `users` VALUES (6, 'ad', '$2a$10$LQ.iYVSiwNuzMpOOeOWM1u3VxDsNF99pe985OGxBpsXJXiIUWAv8i', NULL, NULL, NULL);
INSERT INTO `users` VALUES (7, 'root123', '$2a$10$RPOds1BHzr.JMu4ivuMZP.6BzegSrLGhKxB47F5P0gmpa2ziEpx6.', NULL, NULL, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAgCAYAAADg3g0TAAADIElEQVRoQ+2azWsTeRjHP9/gP7AHT9ajK6J1UXHViy+gZgLuQiu67slOKhUVRRAEvagXRdDDLlTZSjv1poJ1dVkzUUH04ruI+IaIiNbLugfx7jwySfpmk3TaRhM6M5BDMs/veb7P55uZ3y+/jMxzVmJah+wX4EeSYzwEPgDvMPoR/Zg9h2mXlf339XiSlIuV9ab3Yjo62UTJ+GEExH0CriK7KTfvT4SNzMvcBlsykcHJmCgEdJ5U0KnN+etRogdiZJ5j4xmQxE6YwGmgU65/L0qGxJgolGoZY+xX1j8yVsqoxnxCvMGYP1bC5HwEAuKC2vzWapFjGfMPgU6qPZcLk5jnLMbYguiIUD4JqU7gvVy/qVJIFWPskdz8gnIDrSezDdmJhPykCTyV688rv1yuOPkHLXKv/F2ptPU6VzFWT1pa3BMEHFK7f/BrDOEV8x8wfeQJ+yg3/0M1Zualu0HZuHOtSf/SVrXluobnCo15ACwcUUA8Vpv/U1VjejLHkO2pibAkCaBlcnO3B1DIepyLiF/LsPm52prbPOcSEG7jJEdNCNhZuflNQ8Z4TiewfVRuo0tZf2vZyb937SIsdb8mepIkQwQCWtXuXwg/CLdkdoL9WZaPabuyuZPDz5nnbADOJTy/BYHC3tqKojHdzmxSvKhYRlzD7C2W+h9sFqLlW0hKcg4S+F2uf0bhW+tJP0Oak8BpBAJ2Sm6+o2hMr/MHxq5GkBV7DeKV2vxZJWPSGzGdjT2URgHwOWguGFO4arz0DdDyRtEWbx22e8iYbqeFFH3xBtIw3Z8YNKZ01ZwB/dYw8uIqxLj0lTGZpWC34sqjgfp+OMKY4tLZ2Yc43EAi4yjlwyhjSsvnPiz5IVnPb0RZY4rzjdMPzKinuDjXrmhMyZwnwNw4A6pX71WNKZjT7RwkxYF6CYxr3TGNKc45mQ7M/oorpHr0HcmY0m1tMbAD2FwPoXGrGdmYATB2Or2KILUDbH3cYH3Hfl+O25hBg7y0A1oDhK/m7yh66pcyHZ+wMcPpFP5sE2nEbIwmRPgg28zRT99MfaaT61B3UNCH6e4XqNjvy8E/zU0AAAAASUVORK5CYII=');

SET FOREIGN_KEY_CHECKS = 1;
