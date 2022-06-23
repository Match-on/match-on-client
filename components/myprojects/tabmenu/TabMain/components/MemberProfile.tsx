const MemberProfile = () => {
  const teamMember = [
    { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
    { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
    { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
    { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
    { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
    { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  ];
  return (
    <div>
      {/* {teamMember.map((mem, index) => (
        <div key={`member-${index}`}>
          <div>
            {mem.name}
            {mem.school}
          </div>
          <div>
            {mem.list.map((list, i) => (
              <div key={`list-${i}`}>{list}</div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default MemberProfile;
