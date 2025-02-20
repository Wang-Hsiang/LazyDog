"use client"

import styles from "./page.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function MoreCard() {
    return (
        <>
            <h3>狗貓甲狀腺疾病</h3>
            <div className={`${styles.autherDetail}`} style={{ margin: '15px 0' }}>
                <div className={`${styles.floor}`}>樓主</div>
                <div className={`${styles.auther}`} style={{ display: 'inline-block' }}>
                    Tom
                </div>
            </div>
            <div className="time" style={{ margin: '10px 0' }}>
                2025-01-01 編輯
            </div>
            <p>
                相信大家對甲狀腺不陌生，人類也會有相關的疾病，像是甲狀腺功能亢進、低下。
                甲狀腺是控制新陳代謝的腺體，位於脖子那邊，嚴格來說是氣管兩側。
                除非甲狀腺腫起來，不然一般是不會摸到的。診斷甲狀腺疾病的方式有很多，
                臨床症狀、血液檢查是最常見的診斷方式，超音波檢查則是視狀況而定。
                其中，狗狗比較常見甲狀腺功能低下，貓咪則是甲狀腺功能亢進。
            </p>
            <br />
            <p>
                <strong>狗貓甲狀腺疾病狀況不同。</strong>
            </p>
            <img
                src="/article_img/2df54e20-d6c0-11ee-beff-f3978ced.jpg"
                alt="狗貓甲狀腺疾病狀況不同"
                style={{ width: '100%' }}
            />
            <br />
            <h4>甲狀腺功能低下</h4>
            <p>
                臘腸、黃金獵犬、雪納瑞、紅貴賓都是好發品種，一般初次發作的年齡大概會在4-6歲（中年狗狗），
                但是症狀可能初期不會那麼明顯。
            </p>
            <p>
                <strong>常見的症狀：</strong>吃很少但還是胖、皮膚差、呆滯、懶惰
            </p>
            <p>
                血液檢查甲狀腺低下有很多方式，這是因為甲狀腺素也有很多種類和狀態，所以有時候沒有辦法只做其中一項檢查就確診。
            </p>
            <p>
                要注意這是一個要終生吃藥，並嚴重影響生活品質（沒有人會想無精打采地過日子吧）的內分泌疾病，
                因此在診斷上更要小心，不能太過輕忽。
            </p>
            <br />
            <h4>甲狀腺功能亢進</h4>
            <p>常見於8歲以上的貓咪，平均年齡是13歲。</p>
            <p>目前發病的原因不明，有些研究顯示可能和食入較多碘的飲食有關。</p>
            <p>
                <strong>常見的症狀：</strong>
                吃很多但還是變瘦、容易緊張、偶爾嘔吐腹瀉、脫毛
            </p>
            <p>
                <strong>併發症：</strong>肥厚性心肌病（心臟病）、高血壓、慢性腎衰竭
            </p>
            <img
                src="/article_img/4e0f3b30-d6c0-11ee-a15e-4988a03a.jpg"
                alt="貓咪甲狀腺多亢進" style={{ width: '100%' }}
            />

            <p>
                特別要注意的是，肥厚性心肌病是一種會在短時間內致命的疾病，
                甲狀腺治療後，心臟有可能好轉，但若出現不可逆的病變就無法好起來。
                高血壓可能引起很多問題，例如腎衰竭、眼睛病變（甚至可能失明），都是非常嚴重的後果。
            </p>
            <p>
                另外嚴重的甲狀腺亢進甚至會出現「甲狀腺風暴」的狀況，也就是甲狀腺素飆高，
                引起癲癇、昏迷、高溫、精神失常、多重器官衰竭等致命症狀。
            </p>
            <h2>治療</h2>
            <p>
                目前主要是靠口服藥治療，定期回診驗血，根據驗血結果調整吃藥的頻率、劑量，
                並監控有無並發症的產生。
            </p>
            <img
                src="/article_img/fc7d9410-d6bf-11ee-a9ef-d23a59c8.jpg"
                alt="毛孩罹患疾病一定要配合獸醫指示服藥與回診"
                style={{ width: '100%' }}
            />
            <br />
            <h2>預防</h2>
            <p>
                每年安排健康檢查非常重要，才能在疾病沒有明確發展之前，就先介入治療。
            </p>
            <p>尤其是甲狀腺功能亢進，若已造成心臟不可逆的肥厚，那就來不及了。</p>
            <p>
                每天觀察自己的寶貝也很重要，若是有以上提到的：反覆的皮膚病、沒吃很多但變胖、總是睡覺、吃很多卻變瘦等等，
                異常的狀況，就要帶去醫院。
            </p>
        </>
    )
}


