import React from "react";

export default function SkillRanking({ data }) {
  const skillCount = data.reduce((acc, person) => {
    person.skills.forEach((skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const ranking = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);
  const topCount = ranking[0]?.[1];

  return (
    <table className="table table-bordered w-50">
      <thead>
        <tr>
          <th>Skill</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {ranking.map(([skill, count]) => (
          <tr key={skill}>
            <td style={count === topCount ? { fontWeight: "bold" } : {}}>
              {skill}
            </td>
            <td style={count === topCount ? { fontWeight: "bold" } : {}}>
              {count}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
