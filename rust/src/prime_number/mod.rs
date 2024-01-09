

/// Determines whether a given number is prime 
/// using the 6k+=1 optimization algorithm.
///
/// ### Arguments
///
/// * `x` - The number to check for primality.
///
/// ### Returns
///
/// * `true` if the number is prime, `false` otherwise.
///
/// ### Examples
///
/// ```
/// assert_eq!(is_prime(2), true);
/// assert_eq!(is_prime(4), false);
/// assert_eq!(is_prime(17), true);
/// 
/// Time Complexity: O(sqrt(n))
/// Space Complexity: O(1)
/// ```
pub fn is_prime(x: i64) -> bool {
  if x <= 1 {
    return false;
  } 

  if x == 2 || x == 3 {
    return true;
  }

  if x % 2 == 0 || x % 3 == 0 {
    return false;
  }

  let square_root = (x as f64).sqrt() as i64;
  for number in 5..=square_root {
    if x % number == 0 || x % (number + 2) == 0 {
      return false;
    }
  }
  return true;
}