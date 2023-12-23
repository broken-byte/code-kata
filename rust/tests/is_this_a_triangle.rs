#[path = "../src/is_this_a_triangle/mod.rs"]
mod is_this_a_triangle;

#[cfg(test)]
mod tests {
    use crate::is_this_a_triangle::is_triangle;
        
    #[test]
    fn works_for_some_examples() {
        assert_eq!(is_triangle(1, 2, 2), true);
        assert_eq!(is_triangle(7, 2, 2), false);
        assert_eq!(is_triangle(1, 2, 3), false);
        assert_eq!(is_triangle(1, 3, 2), false);
        assert_eq!(is_triangle(3, 1, 2), false);
        assert_eq!(is_triangle(5, 1, 2), false);
        assert_eq!(is_triangle(1, 2, 5), false);
        assert_eq!(is_triangle(2, 5, 1), false);
        assert_eq!(is_triangle(4, 2, 3), true);
        assert_eq!(is_triangle(5, 1, 5), true);
        assert_eq!(is_triangle(2, 2, 2), true);
        assert_eq!(is_triangle(-1, 2, 3), false);
        assert_eq!(is_triangle(1, -2, 3), false);
        assert_eq!(is_triangle(1, 2, -3), false);
        assert_eq!(is_triangle(0, 2, 3), false);
    }
}