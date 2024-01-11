/**
 * Returns a string representing the likes based on the input array.
 * 
 * @param a - An array of strings representing the names of people who liked something.
 * @returns A string representing the likes.
 */
export const likes = (a: string[]): string => {
  const likes_this = 'likes this';
  const like_this = 'like this';

  switch (a.length) {
    case 0:
      return 'no one ' + likes_this;
    case 1:
      return `${a[0]} ` + likes_this;
    case 2:
      return `${a[0]} and ${a[1]} ` + like_this;
    case 3:
      return `${a[0]}, ${a[1]} and ${a[2]} ` + like_this;
    default:
      return `${a[0]}, ${a[1]} and ${a.length - 2} others ` + like_this;
  }
}