export default function (name: string): string {
  const words = name.split(" ");
  const firstName = words[0];
  const lastName = words[1];
  return firstName[0] + lastName[0];
}
