mc.listen('onChat', (player, msg) => {
    // 匹配 @ 或 ＠ 后的玩家名（包括带有空格的玩家名）
    const mentionPattern = /([@＠])(".*?"|[^\s@＠]+)/g;
    const matches = msg.match(mentionPattern);

    if (matches) {
        // 遍历匹配到的每一个 @玩家名
        matches.forEach(mention => {
            let mentionedPlayerName = mention.slice(1); // 去掉 @ 或 ＠ 符号

            // 如果玩家名被双引号包围，则去掉引号
            if (mentionedPlayerName.startsWith('"') && mentionedPlayerName.endsWith('"')) {
                mentionedPlayerName = mentionedPlayerName.slice(1, -1);
            }

            // 遍历所有在线玩家，查找被 @ 的玩家
            mc.getOnlinePlayers().forEach(onlinePlayer => {
                // 获取在线玩家的绑定中文名称
                const playerNick = ll.import("nickname", "getName")(onlinePlayer.xuid);
                const realName = onlinePlayer.realName;

                // 如果匹配到的玩家名与当前玩家的名字或自定义名称相同
                if (mentionedPlayerName === realName || mentionedPlayerName === playerNick) {
                    // 广播消息，提示 @ 被提及的玩家
                    mc.broadcast(`§6${player.realName} 在聊天中提到了 §a${realName}`);

                    // 向被提到的玩家发送 Toast 提示
                    const title = `§6你被 §a${player.realName} §6提及了！`;
                    const message = `请查看聊天，查看消息内容。`;
                    onlinePlayer.sendToast(title, message);

                    // 如果找到匹配的玩家，不再继续搜索
                    return;
                }
            });
        });
    }
});
