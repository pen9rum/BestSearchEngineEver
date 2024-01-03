package NBAProFinder.demo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class DatabasePlayerSearch {

    public List<String> searchPlayerByName(String inputName) {
        List<String> matchingNames = new ArrayList<>();

        try (Connection connection = DatabaseConnection.getConnection()) {
            String sql = "SELECT name FROM player WHERE name LIKE ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, "%" + inputName + "%");  // Using "%" for wildcard search

                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        String fullName = resultSet.getString("name");
                        matchingNames.add(fullName);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return matchingNames;
    }
}