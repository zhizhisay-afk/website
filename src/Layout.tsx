export const Layout = () => {
  return (
    <div
      className={
        "absolute inset-0 z-50 p-5 md:p-10 h-screen text-white  text-xs md:text-sm "
      }
    >
      <div className=" uppercase grid grid-cols-6 h-full w-full grid-rows-6">
        <div
          className=" w-full h-10  "
          style={{
            gridColumn: "1/8",
          }}
        >
          <div className="flex justify-between">
            <div>( Home )</div>
            <div>( About )</div>
            <div>( Projects )</div>
          </div>
        </div>

        <div
          className="hidden sm:flex flex-col  justify-end"
          style={{
            gridColumn: "2/3",
            gridRow: "7/8",
          }}
        >
          <div>Created By</div>
          <div>DeadRabbit</div>
        </div>

        <div
          className=" flex sm:hidden flex-col  justify-end"
          style={{
            gridColumn: "3/4",
            gridRow: "7/8",
          }}
        >
          <div>Created By</div>
          <div>DeadRabbit</div>
        </div>

        <div
          className=" "
          style={{
            gridRow: "7/8",
          }}
        >
          <div>RED</div>
          <div>X / Twitter</div>
          <div>Behance</div>
        </div>

        <div
          className=" flex flex-col justify-end"
          style={{
            gridRow: "7/8",
            gridColumn: "7/8",
          }}
        >
          <div className="">© DeadRabbit 2025</div>
        </div>
      </div>
    </div>
  );
};
