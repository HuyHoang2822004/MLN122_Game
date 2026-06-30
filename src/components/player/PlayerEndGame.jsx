import { motion } from 'framer-motion';

const PlayerEndGame = ({ player, players }) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const myRank = sorted.findIndex((p) => p.id === player.id) + 1;

  const handleDownloadCertificate = () => {
    const text = `
    ==================================================
                 CHỨNG NHẬN HOÀN THÀNH
                    MISSION DECISION
    ==================================================
    Xin chúc mừng sinh viên: ${player.name}
    ${player.studentId ? `MSSV: ${player.studentId}` : ''}
    
    Đã xuất sắc hoàn thành cuộc giả lập quyết định
    về Hiện tượng Moderna - Độc quyền Nhà nước trong CNTB.
    
    KẾT QUẢ CHUNG CUỘC:
    - Xếp hạng phòng: ${myRank}/${players.length}
    - Tổng điểm: ${player.score} pts
    - Huy hiệu đạt được: ${player.achievements?.join(', ') || 'Chưa đạt'}
    
    Ngày hoàn thành: ${new Date().toLocaleDateString('vi-VN')}
    ==================================================
    `;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chung_nhan_${player.name}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen">
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center gap-6">

        {/* Certificate icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-blue-500/10 border border-blue-500/30 glow-blue"
        >
          🎓
        </motion.div>

        <div>
          <h2
            className="text-2xl font-black mb-1 text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Hoàn Thành Nhiệm Vụ!
          </h2>
          <p className="text-sm text-slate-400">
            Bạn đã nỗ lực hoàn tất mọi hồ sơ giả lập.
          </p>
        </div>

        {/* Rank Card */}
        <div
          className="rounded-2xl p-6 w-full max-w-xs flex flex-col gap-4 text-left"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Rank row */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-bold uppercase">Thứ hạng phòng</span>
            <span
              className="text-2xl font-black text-yellow-400"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              #{myRank} <span className="text-xs text-slate-500 font-normal">/ {players.length}</span>
            </span>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

          {/* Score row */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-bold uppercase">Tổng điểm đạt được</span>
            <span
              className="text-2xl font-black text-blue-400"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {player.score} <span className="text-xs text-slate-500 font-normal">pts</span>
            </span>
          </div>
        </div>

        {/* Achievements list */}
        {player.achievements && player.achievements.length > 0 && (
          <div className="w-full max-w-xs">
            <div className="text-xs text-slate-500 font-bold uppercase mb-2 text-left">
              Huy hiệu nhận được ({player.achievements.length})
            </div>
            <div className="flex flex-wrap gap-1.5 justify-start">
              {player.achievements.map((ach) => (
                <span
                  key={ach}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300"
                >
                  🏆 {ach === 'vaccine_hero' ? 'Vaccine Hero' : ach === 'perfect_combo' ? 'Perfect Combo' : ach === 'warp_speed' ? 'Warp Speed' : ach}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadCertificate}
          className="btn btn-primary w-full max-w-xs mt-4"
        >
          📄 Tải Chứng Nhận
        </motion.button>
      </div>

      <div className="relative z-10 text-center text-xs text-slate-600 mt-6">
        Kinh tế Chính trị Mác-Lênin · MLN122
      </div>
    </div>
  );
};

export default PlayerEndGame;
