/**
 * Placeholder party flyer.
 * The reference feed shows a user-uploaded photo; this is a CSS stand-in so the
 * card keeps the same visual weight without shipping stock imagery.
 */
export function EventFlyer() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[linear-gradient(140deg,#d2624a,#e8506f_55%,#b83a5a)]"
      role="img"
      aria-label="Party flyer for The Royal Fitness Club"
    >
      <div className="absolute inset-x-[12%] inset-y-[10%] rotate-[-1.5deg] rounded-sm bg-[#f2ece1] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-4 ring-[#3f5fbf]">
        <p className="text-center text-[13px] font-bold text-[#c0392b] italic md:text-[15px]">
          THE ROYAL FITNESS CLUB
        </p>
        <div className="mt-1.5 grid grid-cols-3 text-[9px] text-[#3d3d3d] md:text-[11px]">
          {[
            ['Packages', 'Regular', 'Personal'],
            ['Monthly', '1500', ''],
            ['Quarterly', '4000', ''],
            ['Half Yearly', '7000', ''],
            ['Yearly', '10,000', ''],
          ].map((row, index) => (
            <div key={index} className="contents">
              {row.map((cell, cellIndex) => (
                <span key={cellIndex} className="border border-[#c9c2b4] px-1.5 py-1">
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
