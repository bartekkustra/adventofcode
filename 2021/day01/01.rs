use std::fs;
use std::time::{Instant};

fn read_input(filename: &str) -> String {
  let contents = fs::read_to_string(String::from(filename))
    .expect("Something went wrong reading the file");
  return contents;
}

fn part1(input: &Vec<i32>) -> i32 {
  let mut sum = 0;
  for i in 1..input.len() {
    if input[i-1] < input[i] {
      sum = sum + 1
    }
  }
  return sum;
}

fn part2(input: &Vec<i32>) -> i32 {
  let mut measurements = Vec::new();
  for i in 2..input.len() {
    let measurementSum = input[i-2] + input[i-1] + input[i];
    measurements.push(measurementSum);
  }

  let mut sum = 0;
  for i in 1..measurements.len() {
    if measurements[i-1] < measurements[i] {
      sum = sum + 1
    }
  }
  return sum
}

fn main() {
  let input_raw = read_input("01.in");
  let input_str: Vec<&str> = input_raw.lines().collect();
  let input: Vec<i32> = input_str
    .iter()
    .map(|x| x.parse().expect("Oops")).collect();

  let p1_start = Instant::now();
  let p1 = part1(&input);
  let p1_end = Instant::now();
  let p1_time = p1_end - p1_start;
  
  let p2_start = Instant::now();
  let p2 = part2(&input);
  let p2_end = Instant::now();
  let p2_time = p2_end - p2_start;
  
  println!("part1: {:?}", p1_time);
  println!("part1: {:?}", p1);
  
  println!("part2: {:?}", p2_time);
  println!("part2: {:?}", p2);
}
