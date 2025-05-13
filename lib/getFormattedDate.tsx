export default function getFormattedDate(dateString: string): string {
   return new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(
      new Date(dateString)
   );
}
