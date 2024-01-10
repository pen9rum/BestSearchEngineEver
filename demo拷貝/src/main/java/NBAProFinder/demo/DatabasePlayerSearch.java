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
        System.out.println("Searching for player with name containing: " + inputName);

        try (Connection connection = DatabaseConnection.getConnection()) {
            String sql = "SELECT name FROM player WHERE name LIKE ?";
            System.out.println("Executing SQL query: " + sql);

            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, "%" + inputName + "%");

                try (ResultSet resultSet = statement.executeQuery()) {
                    while (resultSet.next()) {
                        String fullName = resultSet.getString("name");
                        System.out.println("Found player name: " + fullName);
                        matchingNames.add(fullName);
                    }
                }
            }
        } catch (SQLException e) {
            System.out.println("SQL Exception: " + e.getMessage());
            e.printStackTrace();
        }

        return matchingNames;
    }

}