use std::hash::poseidon2;

fn main(
    server_id: pub Field, 
    user_id: Field,
    user_role_ids: [Field; 5],
    required_role_id: pub Field
) {
    let mut hashed_user_role_ids: [Field; 5] = [0; 5];
    
    // Create hashed role
    for i in 0..5 {
        let hashed_server_role = poseidon2::Poseidon2::hash([server_id, user_id, user_role_ids[i]], 3);
        hashed_user_role_ids[i] = hashed_server_role;
    }

    let hashed_required_user_role_id = poseidon2::Poseidon2::hash([server_id, user_id, required_role_id], 3);
    let mut has_role = false;
    
    for i in 0..5 {
        if hashed_required_user_role_id == hashed_user_role_ids[i] {
            has_role = true;
        }
    }

    assert(has_role);
}

#[test]
fn test_valid_role() {
    // Test case where user has the required role
    let server_id = 1;
    let user_id = 100;
    let user_role_ids = [1, 2, 3, 4, 5];
    let required_role_id = 3; // Role that exists in user_role_ids

    main(server_id, user_id, user_role_ids, required_role_id);
}

#[test(should_fail)]
fn test_invalid_role() {
    // Test case where user doesn't have the required role
    let server_id = 1;
    let user_id = 100;
    let user_role_ids = [1, 2, 3, 4, 5];
    let required_role_id = 6; // Role that doesn't exist in user_role_ids

    main(server_id, user_id, user_role_ids, required_role_id);
}
#[test(should_fail)]
fn test_empty_roles() {
    // Test case where all roles are 0
    let server_id = 1;
    let user_id = 100;
    let user_role_ids = [0, 0, 0, 0, 0];
    let required_role_id = 1;

    main(server_id, user_id, user_role_ids, required_role_id);
}
