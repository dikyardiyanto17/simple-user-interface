export default function RoleOptions({ role, stat }) {
  return (
    <>
      {role === stat && (
        <option value={stat} defaultValue={stat}>
          {stat}
        </option>
      )}
      {role !== stat && (
        <option value={stat}>
          {stat}
        </option>
      )}
    </>
  );
}
