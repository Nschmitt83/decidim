# frozen_string_literal: true

module Decidim
  module Admin
    # Counts active users making a distinction between whether they are admins or participants
    class ActiveUsersCounter < Rectify::Query
      # Initializes the class.
      #
      # @param organization [Organization] Current organization
      # @param date [Date] Period time to make users count check
      # @param admin [String] Possible values : t for Admin or f for participant
      def initialize(organization:, date:, admin:)
        @organization = organization
        @date = date
        @admin = admin
      end

      # Count the user's number who have logged in since given date
      #
      # Returns an ActiveRecord::Relation
      def query
        return Decidim::User.none unless organization
        return Decidim::User.none unless date
        return Decidim::User.none unless admin

        query = Decidim::User.left_outer_joins(:organization).where(decidim_organizations: { id: organization.id })

        query = query.where("#{Decidim::User.table_name}.current_sign_in_at >= ?", date) unless date.nil?

        query = query.where(admin: admin)

        query
      end

      private

      attr_reader :organization, :date, :admin
    end
  end
end
